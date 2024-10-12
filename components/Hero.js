import styles from './Hero.module.css'

export default function Hero({ name, imgUrl }) {
    return (
        <>
            <div className={styles.hero}>
                <h1 className={styles.title}>{name}</h1>
                <img className={styles.heroImg} src={imgUrl}></img>
            </div>
        </>
    )
}
