import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react";
import { verifyToken } from "../../services/user";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";

export default function NavBar(){

    const [tokenExists, setTokenExists] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = getCookie("authorization")
                console.log("passou token")
                console.log(token)
                if (!token) {
                    setTokenExists(false);
                    return;
                }
                console.log(token)
                const tokenVerificado = verifyToken(token);
                console.log(tokenVerificado)
                setTokenExists(true);
            } catch (err) {
                console.log("deu ruim")
                setTokenExists(false);
            }
        };
        checkToken();
    }, []);

    function handleClick() {
        console.log('increment like count');
        Cookies.remove("authorization")
        setTokenExists(false);
        console.log(tokenExists);
    }

    return (
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
                            <button className={styles.sair} onClick={handleClick}>Sair</button>
                        </li>
                    </>
                )}
                
                <li>
                    <Link href="/about">Sobre</Link>
                </li>
            </ul>
        </nav>
    )
}