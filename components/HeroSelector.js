import styles from './HeroSelector.module.css'
import React, { useState } from 'react';
import HeroLine from '@components/HeroLine';

export default function HeroSelector(onToggle) {
    const [selectedImages, setSelectedImages] = useState(new Set());

    const toggleImage = (name) => {
        const newSelectedImages = new Set(selectedImages);

        if (newSelectedImages.has(name)) {
            newSelectedImages.delete(name);
        } else {
            newSelectedImages.add(name);
        }

        setSelectedImages(newSelectedImages);
        onToggle.onToggle(newSelectedImages);
    };

    const heroes = [
        [
            'Sierra & Oddball',
            'Subhash & Marmo',
            'Treyst & Rossum'
        ],
        [
            'Kojo & Booda',
            'Atsadi & Surge',
            'Basira & Kaizaimon'
        ],
        [
            'Nevenka & Blotch',
            'Auraq & Kibble',
            'Fen & Crowbar'
        ],
        [
            'Teija & Nauraa',
            'Arjun & Spike',
            'Rin & Orchid'
        ],
        [
            'Sigismar & Wingspan',
            'Gulrang & Tocsin',
            'Waru & Mack'
        ],
        [
            'Akesha & Taru',
            'Afanas & Senka',
            'Lindiwe & Maw'
        ]
    ];

    return (<>
        <div className={styles.heroes}>
            {heroes.map((line) =>
                <HeroLine heroes={line} selectedImages={selectedImages} onToggle={toggleImage}></HeroLine>
            )}
        </div>
    </>)
}
