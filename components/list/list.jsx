import FlipMove from "react-flip-move";

import styles from "./list.module.css"
import Poster from "../poster/poster"

const List = ({ results }) => {
    return (
        <FlipMove className={styles.poster}>
            {results.map((result) => (
                <Poster key={result.id} result={result} />
            ))}
        </FlipMove>
    )
};

export default List;