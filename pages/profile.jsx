import { getCookie } from 'cookies-next'
import { verifyToken } from '../services/user'
import { useEffect, useState } from 'react';
import List from '../components/list/list';
import Favorit from '../components/favorits/favorit';

function Profile() {
    const BASE_URL = "https://image.tmdb.org/t/p/";
    const [error, setError] = useState('')
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isMovieDetailsLoaded, setIsMovieDetailsLoaded] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
    })

    const fetchFavoriteMovies = async () => {
        try {
            const storedEmail = localStorage.getItem('userEmail');
            formData.email = storedEmail;

            if(!(storedEmail === '' || storedEmail === undefined)){
                const response = await fetch(`/api/user/getFavorits`, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                })
                
                if (response.ok) {
                    const data = await response.json();
                    setFavoriteMovies(data);
                    fetchMovieDetails(data);
                } else {
                    setError("Error retrieving favorite movies.");
                }
            }

        } catch (err) {
            setError(err.message);
        }
    };

    const fetchMovieDetails = async (movieIds) => {
        try {

            const requests = movieIds.map((movieId) =>
                fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a81c3cb2e8b78a97806f76f4f60f684b&language=pt-BR`).then((response) => response.json())
            );

            const movieData = await Promise.all(requests);
            setMovieDetails(movieData);
        } catch (err) {
            setError("Error retrieving movie details.");
        }
    };

    useEffect(() => {
        fetchFavoriteMovies();
    }, []);

    useEffect(() => {
        setIsMovieDetailsLoaded(true);
    }, [movieDetails])

    return (
        <div>
            
            {isMovieDetailsLoaded ? (
                movieDetails.map((movie) => (
                    <div key={movie.id} >
                        <img 
                            src={
                                `${BASE_URL}w500${ movie.poster_path }`
                            }
                        />
                    </div>
                ))
            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
}

Profile.displayName = "Profile";

export default Profile;