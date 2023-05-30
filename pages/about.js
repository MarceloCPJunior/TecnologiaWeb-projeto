import styles from '../styles/about.module.css'

export default function About() {
    return (
        <div className={styles.about}>
            <h1>Sobre o Projeto</h1>
            <p>Este é um site de catálogo de filmes que apresenta informações sobre eles. 
                É um projeto desenvolvido para a disciplina de Tecnologia Web, com o objetivo de 
                aprender e praticar as tecnologias de front-end.</p>
        </div>
    )
}