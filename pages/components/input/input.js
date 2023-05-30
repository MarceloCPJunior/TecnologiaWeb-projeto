import styles from "./input.module.css"

export default function Input({ icon, ...props}) {
    return(
        <div className={styles.containerInput}>
            {icon}
            <input className={styles.input} {...props} />
        </div>
    )
}