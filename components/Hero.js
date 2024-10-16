import styles from './Hero.module.css'

export default function Hero({ src, name, onToggle, isSelected, readonly, banned}) {
    return (
        <>
            <div className={styles.hero}
                data-key={name}
                onClick={() => { onToggle ? onToggle(name) : null }}>
                <h1 className={styles.title}>{name}</h1>
                <img className={(isSelected ? styles.selected : '') + ' ' + styles.heroImg + ' ' 
                    + (readonly && !banned ? styles.readonly : '') + ' ' + (!banned ? styles.unbanned : '')} src={src}></img>
            </div>
        </>
    )
}
