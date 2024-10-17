import styles from './Hero.module.css'

export default function Hero({ src, name, onToggle, isSelected, readonly, banned}) {
    return (
        <>
            <div className={styles.hero + ' ' + (banned ? styles.banned : '')}
                data-key={name}
                onClick={() => { onToggle ? onToggle(name) : null }}>
                
                <span className={styles.title}>{name}</span>
                <img className={
                    styles.heroImg + ' ' + 
                    (isSelected ? styles.selected : '') + ' ' + 
                    (readonly && !banned ? styles.readonly : '') + ' ' + 
                    (!!!banned ? styles.unbanned : '') + ' ' + 
                    (banned ? styles.banned : '')
                } src={src}></img>
                
            </div>
        </>
    )
}
