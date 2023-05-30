import { getCookie } from 'cookies-next'
import { verifyToken } from '../services/user'

export default function Profile() {
    return (
        <div>
            <h1>Perfil do usuário</h1>
        </div>
    )
}

export const getServerSideProps = async ({req, res}) => {
    try {
        const token = getCookie('authorization', {req, res})
        if(!token) throw new Error('Token inválido')

        verifyToken(token)
        
        return {
            props: {}
        }
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            },
            props: {}
        }
    }
}