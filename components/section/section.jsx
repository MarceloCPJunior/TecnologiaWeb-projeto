import { forwardRef, useContext, useEffect, useState } from "react";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import styles from "./section.module.css";
import AuthContext from "../../services/authContext";

const Section = forwardRef(({ result }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/";

    const [formData, setFormData] = useState({
        email: '',
        movieId: '',
    })
    const [error, setError] = useState('')
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [isMovieFavorite, setIsMovieFavorite] = useState(false);

    const fetchFavoriteMovies = async () => {
        try {
            const storedEmail = localStorage.getItem('userEmail');
            formData.movieId = result.id;
            formData.email = storedEmail;

            if(!(storedEmail === '' || storedEmail === undefined)){
                const response = await fetch(`/api/user/getFavorits`, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                })
                
                if (response.ok) {
                    const data = await response.json();
                    setFavoriteMovies(data);
                    isFavorite();
                } else {
                    setError("Error retrieving favorite movies.");
                }
            }

        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchFavoriteMovies();
    }, []);

    useEffect(() => {
        isFavorite()
    }, [favoriteMovies, result.id ])

    function isFavorite() {
        const isFavorite = Array.isArray(favoriteMovies) && favoriteMovies.find(movie => String(movie) === String(result.id)) !== undefined;
        setIsMovieFavorite(isFavorite);
    }

    const handleFavorite = async (event) => {
        try{
            event.preventDefault()
            const storedEmail = localStorage.getItem('userEmail');
            formData.movieId = result.id;
            formData.email = storedEmail;
            if(!(storedEmail === '' || storedEmail === undefined)){
                const response = await fetch(`/api/user/favorite`, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                })
    
                const data = await response.json();
                setFavoriteMovies(data);
            }
        } catch(err){
            setError(err.message)
        }
    }
    
    return (
        <div ref={ref}>
            <div className={styles.cardHeader} style={{ backgroundImage: `url(${BASE_URL}original${result.backdrop_path})`, opacity: "0.2" }} />
            <div className={styles.descriptionBox}>
                <img
                    className={styles.image}
                    src={
                        `${BASE_URL}w500${result.poster_path || result.backdrop_path }`
                    }
                />
                <div className={styles.description}>
                    <h1 className={styles.title}>
                        {result.title || result.original_title} <span className={styles.date}>({result.release_date})</span>
                    </h1>
                    <button onClick={handleFavorite} className={styles.heartIcon}>
                        {isMovieFavorite ? (
                            <StarSolidIcon className={styles.heartIcon} />
                        ) : (
                            <StarOutlineIcon className={styles.heartIcon} />
                        )}
                    </button>
                    <p className={styles.tagline}>{result.tagline}</p>
                    <h3>Sinopse</h3>
                    <p>
                        {result.overview}
                    </p>
                </div>
            </div>
        </div>
    )
});

Section.displayName = "Section";

export default Section;