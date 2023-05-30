import Link from 'next/link'
import Input from '../components/input/input'
import LoginCard from '../components/loginCard/loginCard'
import Button from '../components/button/button'
import styles from '../styles/register.module.css'
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline"
import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch(`/api/user/register`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const json = await response.json()

            if(response.status !== 201) throw new Error(json)

            setCookie('authorization', json)
            router.push('/')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <LoginCard>
                <form onSubmit={handlerForm} className={styles.form}>
                    <Input
                        type="text" placeholder="Nome" icon={<UserIcon />}
                        required value={formData.name} onChange={(e) => handlerFormEdit(e, 'name')}
                    />
                    <Input
                        type="email" placeholder="E-mail" icon={<EnvelopeIcon />}
                        required value={formData.email} onChange={(e) => handlerFormEdit(e, 'email')}
                    />
                    <Input
                        type="password" placeholder="Senha" icon={<LockClosedIcon />}
                        required value={formData.password} onChange={(e) => handlerFormEdit(e, 'password')}
                    />
                    <Button>Registrar</Button>
                    {error && <strong><p className={styles.error}>{error}</p></strong>}
                    <Link href='/login' className={styles.link}>Já possui uma conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}