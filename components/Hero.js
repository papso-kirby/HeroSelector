import styles from './Hero.module.css'

export default function Hero({ src, name, onToggle, isSelected, readonly}) {
    return (
        <>
            <div className={styles.hero}
                data-key={name}
                onClick={() => { onToggle ? onToggle(name) : null }}>
                <h1 className={styles.title}>{name}</h1>
                <img className={(isSelected ? styles.selected : '') + ' ' + styles.heroImg + ' ' + (readonly ? styles.readonly : '')} src={src}></img>
            </div>
        </>
    )
}
