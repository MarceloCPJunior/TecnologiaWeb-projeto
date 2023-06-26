import Link from 'next/link'
import Input from '../components/input/input'
import LoginCard from '../components/loginCard/loginCard'
import Button from '../components/button/button'
import styles from '../styles/login.module.css'
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import AuthContext from '../services/authContext'

export default function Login() {
    const { setTokenExists } = useContext(AuthContext);
    const { updateUserEmail  } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const router = useRouter()

    const handlerFormEdit = (event, name) => {
        setError('')
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const handlerForm = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const json = await response.json();

            if(response.status !== 200) throw new Error(json)

            setCookie('authorization', json)
            setTokenExists(true);
            
            updateUserEmail(formData.email);
            router.push('/');
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <LoginCard>
            <form onSubmit={handlerForm} className={styles.form}>
                <Input
                    type="email" placeholder="E-mail" icon={<EnvelopeIcon />}
                    required value={formData.email} onChange={(e) => handlerFormEdit(e, 'email')}
                />
                <Input
                    type="password" placeholder="Senha" icon={<LockClosedIcon />}
                    required value={formData.password} onChange={(e) => handlerFormEdit(e, 'password')}
                />
                <Button>Entrar</Button>
                {error && <strong><p className={styles.error}>{error}</p></strong>}
                <Link href='/register' className={styles.link}>Ainda não possui uma conta?</Link>
            </form>
        </LoginCard>
    )
}