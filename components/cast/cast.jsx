import { forwardRef } from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from "./cast.module.css"


const Cast = forwardRef(({ credits }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/w154";
    return (
        <div ref={ref} className={styles.castContainer}>
            <div>
                <p>Elenco principal</p>
            </div>
            <div className={styles.castBox}>
                {credits.map((credit) => (
                    <div key={credit.id} className={styles.imageBox}>
                        <img className={styles.image}
                            src={
                                `${BASE_URL}${ credit.profile_path }`
                            }
                            alt={credit.name}
                        />
                        <div className={styles.info}>
                            <strong><p className={styles.name}>{credit.name}</p></strong>
                            <p className={styles.name}>{credit.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
});

Cast.displayName = "Cast";

export default Cast;