import styles from './Hero.module.css'

export default function Hero({ src, name, onToggle, isSelected}) {
    return (
        <>
            <div className={styles.hero}
                data-key={name}
                onClick={() => onToggle(name)}>
                <h1 className={styles.title}>{name}</h1>
                <img className={(isSelected ? styles.selected : '') + ' ' + styles.heroImg } src={src}></img>
            </div>
        </>
    )
}
