import styles from "./button.module.css"

export default function Button({ children, ...props}) {
    return(
        <button href="#" className={styles.button}>
            <div className={styles.button__line}></div>
            <div className={styles.button__line}></div>
            <span className={styles.button__text}>{children}</span>
        </button>
    )
}