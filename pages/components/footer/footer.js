import styles from "./footer.module.css"

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <p>
                <span>Cinéfilo</span> &copy; 2023
            </p>
        </footer>
    )
}