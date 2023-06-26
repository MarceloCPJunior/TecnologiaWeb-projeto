import { forwardRef, useContext } from "react";
import { HeartIcon } from "@heroicons/react/24/outline"
import styles from "./poster.module.css";
import { useRouter } from "next/router";

const Poster = forwardRef(({ result }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/w342";
    const router = useRouter()
    
    function handlerCkick() {
        router.push(`/more?movie=${result.id}`);
    }
    
    return (
        <div ref={ref} className={styles.posterCard} onClick={ () => handlerCkick() }>
            <div className={styles.cardHeader}>
                <img 
                    className={styles.image}
                    src={
                        `${BASE_URL}${result.poster_path || result.backdrop_path }`
                    }
                />
            </div>
            <div className={styles.cardBody}>
                <h2 className={styles.title}>
                    {result.title || result.original_title}
                </h2>
                <p className={styles.overview}>
                    {result.overview}
                </p>
                <h4 className={styles.date}>
                    {result.release_date || result.first_air_date} - {" "}
                    {result.vote_count} <HeartIcon className={styles.likeIcon} />
                </h4>
            </div>
        </div>
    )
});

Poster.displayName = "Poster";

export default Poster;