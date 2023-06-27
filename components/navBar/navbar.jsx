import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css"
import { useContext, useEffect, useState } from "react";
import { verifyToken } from "../../services/user";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
import AuthContext from "../../services/authContext";

export default function NavBar(){

    const { tokenExists, setTokenExists } = useContext(AuthContext);
    const { updateUserEmail } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        perfilImageLink: '',
    })

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
        userInfo();
    }, []);

    function handleClick() {
        Cookies.remove("authorization")
        setTokenExists(false);
        updateUserEmail('')
    }

    const userInfo = async () => {
        try {
            const storedEmail = localStorage.getItem('userEmail');
            formData.email = storedEmail;

            if(!(storedEmail === '' || storedEmail === undefined)){
                const response = await fetch(`/api/user/userInfo`, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                })
                
                if (response.ok) {
                    const data = await response.json();
                    formData.perfilImageLink = data.perfilImageLink || '/images/do-utilizador.png';
                }
            }

        } catch (err) {
            setError(err.message);
        }
    };

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
                                <Link href="/profile">
                                    <img src={formData.perfilImageLink || "/images/do-utilizador.png"} className={styles.imagePerfil}></img>
                                </Link>
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