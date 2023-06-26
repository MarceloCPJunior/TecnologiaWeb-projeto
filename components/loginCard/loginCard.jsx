import styles from './loginCard.module.css'

export default function LoginCard({ children }) {
    return (
        <div className={styles.card}>
            {children}
        </div>
    )
}
