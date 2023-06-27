import { PencilSquareIcon } from "@heroicons/react/24/outline"
import styles from "./inputPerfil.module.css"

export default function InputPerfil({ icon, placeholder, ...props}) {
    return(
        <div className={styles.inputBox}>
            <div className={styles.containerInput}>
                {icon}
                <input readOnly className={styles.input} type="text" placeholder={placeholder} />
            </div>
        </div>
    )
}