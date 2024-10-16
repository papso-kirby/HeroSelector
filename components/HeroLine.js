import Hero from '@components/Hero'
import styles from './HeroLine.module.css'

const allHeroes = {
        'Sierra & Oddball': 'https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_AX_01/JPG/en_US/6958dcd407c29a6fab4130f6dca88d2b.jpg',
        'Subhash & Marmo': 'https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_AX_03/JPG/en_US/b2d43252d9edb7b98a1cfe6c365ad0fa.jpg',
        'Treyst & Rossum': 'https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_AX_02/JPG/en_US/0a282a089b3d451d4f520e8e90853fc2.jpg', 
        'Kojo & Booda': 'https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_BR_01/JPG/en_US/b3e7c1d3624d241c2f90271002235d6d.jpg',
        'Atsadi & Surge': 'https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_BR_02/JPG/en_US/9a6f27bc74778b542fd5a8fdea5f905b.jpg',
        'Basira & Kaizaimon': 'https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_BR_03/JPG/en_US/2d4b254b457ce26cd1baf59410402d4d.jpg',
        'Nevenka & Blotch': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_LY_01/JPG/en_US/a154eadec509fefb845f7dc8adf5bf81.jpg" ,
        'Auraq & Kibble': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_LY_02/JPG/en_US/45330962b7e9052bed720a6798a9526f.jpg" ,
        'Fen & Crowbar': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_LY_03/JPG/en_US/45430b53a594ccff5fab13442fee1f94.jpg",
        'Teija & Nauraa': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_MU_01/JPG/en_US/bf31c6402a850ce393a17517dab3656e.jpg" ,
        'Arjun & Spike': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_MU_02/JPG/en_US/ac95a529823e88aa2e2f24d59feff4dd.jpg" ,
        'Rin & Orchid': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_MU_03/JPG/en_US/f1f76e326605bf3357ff3fa9aa9e926b.jpg",
        'Sigismar & Wingspan': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_OR_01/JPG/en_US/4a86176d6fa352254a123692cb56cc6b.jpg" ,
        'Gulrang & Tocsin': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_OR_03/JPG/en_US/6346103868c74bb19f6f8ebcf3903246.jpg" ,
        'Waru & Mack': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_OR_02/JPG/en_US/94e5dd55f2a88299255f1b565cbe981a.jpg",
        'Akesha & Taru': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_YZ_01/JPG/en_US/35a88766db2b288c75bf1014e4ec82f4.jpg" ,
        'Afanas & Senka': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_YZ_03/JPG/en_US/adc30378bc26a84c9f966c0945b919e9.jpg" ,
        'Lindiwe & Maw': "https://altered-prod-eu.s3.amazonaws.com/Art/COREKS/CARDS/ALT_CORE_B_YZ_02/JPG/en_US/8d1c2d0d672092300fb67eee05e2ab9a.jpg",
};

export default function HeroLine({heroes, selectedImages, onToggle, banned}) {
    return (
        <div className={styles.heroLine}>
            {heroes.map((h) =>
            <Hero
                key={h}
                src={allHeroes[h] ?? 'https://www.altered.gg/card-back.jpg'}
                name={h}
                isSelected={selectedImages && selectedImages.has(h)}
                readonly={selectedImages==null}
                onToggle={onToggle}
                banned={h === banned}
            />)}
        </div>
    )
}