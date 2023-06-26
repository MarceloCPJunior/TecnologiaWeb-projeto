import { forwardRef } from "react";

const Favorit = forwardRef(({ result }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/";

    return (
        <div ref={ref}>
            <img
                src={
                    `${BASE_URL}w500${ result.poster_path }`
                }
            />
        </div>
    );
});

Favorit.displayName = "Favorit";

export default Favorit;

