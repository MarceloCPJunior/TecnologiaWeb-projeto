import { useEffect, useRef, useState } from 'react';
import styles from "../styles/profile.module.css"
import Input from '../components/input/input';
import { EnvelopeIcon, LockClosedIcon, UserIcon, ArrowUpRightIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import InputPerfil from '../components/inputPerfil/inputPerfil';
import Button from '../components/button/button';
import { ImageList, ImageListItem } from "@mui/material";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import perfil from "../baza/perfil";

function Profile() {
    const BASE_URL = "https://image.tmdb.org/t/p/";
    const [error, setError] = useState('')
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isMovieDetailsLoaded, setIsMovieDetailsLoaded] = useState(false);
    const [activeDiv, setActiveDiv] = useState(0);
    const carousel = useRef();
    const [width, setWidth] = useState(0);
    const router = useRouter()
    const [imagePerfil, setImagePerfil] = useState('')
    const [origilPerfil, setOriginalPerfil] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        perfilImageLink: '',
        favoritos: [],
    })

    const [formDataField, setFormDataEmail] = useState({
        email: '',
        password: '',
        newField : '',
        confirmField: '',
    })

    const [formDataPerfil, setFormDataPerfil] = useState({
        email: '',
        newImg: '',
    })

    const fetchFavoriteMovies = async () => {
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
                    formData.name = data.name;
                    formData.email = data.email;
                    formData.perfilImageLink = data.perfilImageLink || '/images/do-utilizador.png';
                    setOriginalPerfil(data.perfilImageLink || '/images/do-utilizador.png')
                    formData.favoritos = data.favoritos;

                    fetchMovieDetails(formData.favoritos);
                } else {
                    setError("Error retrieving favorite movies.");
                }
            }

        } catch (err) {
            setError(err.message);
        }
    };

    const fetchMovieDetails = async (movieIds) => {
        try {

            const requests = movieIds.map((movieId) =>
                fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a81c3cb2e8b78a97806f76f4f60f684b&language=pt-BR`).then((response) => response.json())
            );

            const movieData = await Promise.all(requests);
            setMovieDetails(movieData);
        } catch (err) {
            setError("Error retrieving movie details.");
        }
    };

    useEffect(() => {
        fetchFavoriteMovies();
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, []);

    useEffect(() => {
        setIsMovieDetailsLoaded(true);
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, [movieDetails])

    const handleButtonClick = (div) => {
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
        formDataField.password = '';
        formDataField.newField = '';
        formDataField.confirmField = '';
        setActiveDiv(div);
        formData.perfilImageLink = origilPerfil;
    }

    const handlerFormEdit = (event, name) => {
        setError('')
        setFormDataEmail({
            ...formDataField,
            [name]: event.target.value
        })
    }

    const handlerFormEmail = async (event) => {
        try {
            event.preventDefault()

            const storedEmail = localStorage.getItem('userEmail');
            formDataField.email = storedEmail;

            if(formDataField.newField !== formDataField.confirmField){
                throw new Error('Preencha ambos os campos igualmente.');
            }

            if(formDataField.newField === storedEmail){
                throw new Error('Escolha um e-mail diferente do atual');
            }

            const response = await fetch(`/api/user/alterEmail`, {
                method: 'POST',
                body: JSON.stringify(formDataField)
            })
            
            const json = await response.json()
            
            if(response.status !== 200) throw new Error(json)

            setError(json)
        } catch (err) {
            setError(err.message)
        }
    }

    const handlerFormPassword = async (event) => {
        try {
            event.preventDefault()

            const storedEmail = localStorage.getItem('userEmail');
            formDataField.email = storedEmail;

            if(formDataField.newField !== formDataField.confirmField){
                throw new Error('Campos diferentes');
            }

            const response = await fetch(`/api/user/alterPassword`, {
                method: 'POST',
                body: JSON.stringify(formDataField)
            })
            
            const json = await response.json()
            
            if(response.status !== 200) throw new Error(json)

            setError(json)
        } catch (err) {
            setError(err.message)
        }
    }

    function handlerClickPerfil(src) {
        setImagePerfil(src)
        formData.perfilImageLink = src;
    }

    const hundlerFormPerfil = async (event) =>  {
        try {

            const storedEmail = localStorage.getItem('userEmail');
            formDataPerfil.email = storedEmail;
            formDataPerfil.newImg = imagePerfil;

            const response = await fetch(`/api/user/alterPerfil`, {
                method: 'POST',
                body: JSON.stringify(formDataPerfil)
            })
            
            const json = await response.json()
            
            if(response.status !== 200) throw new Error(json)

            setOriginalPerfil(imagePerfil);

            setError(json)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.perfilBox}>
                <img src={formData.perfilImageLink} className={styles.imagePerfil} onClick={() => handleButtonClick(4)} />
                <button className={styles.defaultButton} onClick={() => handleButtonClick(0)}>
                    <div className={styles.box}>
                        <div className={styles.btn}>
                            <a>Perfil</a>
                        </div>
                    </div>
                </button>
                <button className={styles.defaultButton} onClick={() => handleButtonClick(1)}>
                    <div className={styles.box}>
                        <div className={styles.btn}>
                            <a>Favoritos</a>
                        </div>
                    </div>
                </button>
                <button className={styles.defaultButton} onClick={() => handleButtonClick(2)}>
                    <div className={styles.box}>
                        <div className={styles.btn}>
                            <a>Alterar Email</a>
                        </div>
                    </div>
                </button>
                <button className={styles.defaultButton} onClick={() => handleButtonClick(3)}>
                    <div className={styles.box}>
                        <div className={styles.btn}>
                            <a>Alterar Senha</a>
                        </div>
                    </div>
                </button>
            </div>
            <div className={styles.line1}></div>
            {activeDiv === 4 && (
                <div className={styles.alterBox}>
                    <h1>Imagem de perfil</h1>
                    <div className={styles.line2}></div>
                    <h2>Escolha uma imagem para alterar a imagem de perfil</h2>
                    <div className={styles.imagePerfilBox}>
                        {Object.entries(perfil).map((image) => (
                            <img key={image} className={styles.imagePerfil}
                                src={image[1].src}
                                onClick={() => handlerClickPerfil(image[1].src)}
                            />
                        ))}
                    </div>

                    <button className={styles.defaultButton} onClick={() => hundlerFormPerfil()}>
                        <div className={styles.box}>
                            <div className={styles.btn}>
                                <a>Confirmar</a>
                            </div>
                        </div>
                    </button>
                    {error && <strong><p className={styles.error}>{error}</p></strong>}
                </div>
            )}
            {activeDiv === 0 && (
                <div className={styles.alterBox}>
                    <h1>Perfil</h1>
                    <div className={styles.line2}></div>
                    <div className={styles.containerInput}>
                        {<UserIcon />}
                        <input readOnly className={styles.input} type="text" placeholder={formData.name} />
                    </div>
                    <InputPerfil icon={<EnvelopeIcon />} placeholder={formData.email} />
                    <InputPerfil icon={<LockClosedIcon />} placeholder={"************"} />
                </div>
            )}
            {activeDiv === 2 && (
                <div className={styles.alterBox}>
                    <h1>Alterar e-mail</h1>
                    <div className={styles.line2}></div>
                    <form onSubmit={handlerFormEmail} className={styles.form}>
                        <Input 
                            type="password" placeholder="Digite sua senha atual para continuar.." icon={<LockClosedIcon />}
                            required value={formDataField.password} onChange={(e) => handlerFormEdit(e, 'password')}
                        />
                        <Input 
                            type="email" placeholder="Novo endereço de e-mail" icon={<EnvelopeIcon />}
                            required value={formDataField.newField} onChange={(e) => handlerFormEdit(e, 'newField')}
                        />
                        <Input 
                            type="email" placeholder="Confirmar novo endereço de e-mail" icon={<EnvelopeIcon />}
                            required value={formDataField.confirmField} onChange={(e) => handlerFormEdit(e, 'confirmField')}
                        />
                        <Button>Alterar</Button>
                        {error && <strong><p className={styles.error}>{error}</p></strong>}
                    </form>
                </div>
            )}
            {activeDiv === 3 && (
                <div className={styles.alterBox}>
                    <h1>Alterar senha</h1>
                    <div className={styles.line2}></div>
                    <form onSubmit={handlerFormPassword} className={styles.form}>
                        <Input 
                            type="password" placeholder="Digite sua senha atual para continuar.." icon={<LockClosedIcon />}
                            required value={formDataField.password} onChange={(e) => handlerFormEdit(e, 'password')}
                        />
                        <Input 
                            type="password" placeholder="Nova senha" icon={<LockClosedIcon />}
                            required value={formDataField.newField} onChange={(e) => handlerFormEdit(e, 'newField')}
                        />
                        <Input 
                            type="password" placeholder="Confirmar nova senha" icon={<LockClosedIcon />}
                            required value={formDataField.confirmField} onChange={(e) => handlerFormEdit(e, 'confirmField')}
                        />
                        <Button>Alterar</Button>
                        {error && <strong><p className={styles.error}>{error}</p></strong>}
                    </form>
                </div>
            )}
            {activeDiv === 1 && (
                <div className={styles.alterBox}>
                    <h1>Favoritos</h1>
                    <div className={styles.line2}></div>
                    {isMovieDetailsLoaded ? (
                        <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: "grabbing"}}>
                            <motion.div className={styles.imageBox} drag="x" dragConstraints={{right: 0, left: -width}} initial={{x:100}} animate={{x:0}} transition={{ duration: 0.8 }}>
                                {movieDetails.map((movie) => (
                                    <motion.div key={movie.id} className={styles.favorit}>
                                        <img 
                                            src={
                                                `${BASE_URL}w342${ movie.poster_path }`
                                            }
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <p>Carregando favoritos...</p>
                    )}
                </div>
            )}
            
        </div>
    );
}

Profile.displayName = "Profile";

export default Profile;