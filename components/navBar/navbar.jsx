import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css"
import { useContext, useEffect } from "react";
import { verifyToken } from "../../services/user";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
import AuthContext from "../../services/authContext";

export default function NavBar(){

    const { tokenExists, setTokenExists } = useContext(AuthContext);
    const { updateUserEmail } = useContext(AuthContext);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = getCookie("authorization")

                if (!token) {
                    setTokenExists(false);
                    return;
                }
                
                const tokenVerificado = verifyToken(token);
                
                setTokenExists(true);
            } catch (err) {
                setTokenExists(false);
            }
        };
        checkToken();
    }, []);

    function handleClick() {
        Cookies.remove("authorization")
        setTokenExists(false);
        updateUserEmail('')
    }

    return (
        <AuthContext.Provider value={[tokenExists, setTokenExists]}>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.link}>
                    <div className={styles.logo}>
                        <Image src="/images/logo.png" width="52" height="52" alt="Cinéfilo"/>
                        <h1>Cinéfilo</h1>
                    </div>
                </Link>
            
                <ul className={styles.link_items}>
                    {!tokenExists ? (
                        <>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Registrar</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/profile">Perfil</Link>
                            </li>
                            <li>
                                <Link href="/" onClick={handleClick}>Sair</Link>
                            </li>
                        </>
                    )}
                    
                    <li>
                        <Link href="/about">Sobre</Link>
                    </li>
                </ul>
            </nav>
        </AuthContext.Provider>
    )
}