import HeroSelector from '@components/HeroSelector';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import sessionEffect from '../shared/effects';
import { postData } from 'services/apiService';

export default function Home() {

    const [selectedImages, setSelectedImages] = useState(new Set());

    const onToggle = (selected) => setSelectedImages(selected)

    const searchParams = useSearchParams();
    const sessionID = searchParams.get('session');
    const playerKey = searchParams.get('player');

    const [session, loading, error, setSession, setLoading, setError] = sessionEffect(sessionID);

    async function handleSubmit(e, playerB) {
        e.preventDefault();
        const heroes = [...selectedImages];
        try {
            const json = await postData(playerB ? `/join/${sessionID}`  : '/create', 
            {
                hero1: heroes[0],
                hero2: heroes[1],
                hero3: heroes[2]
            });

            window.location.href = `/selection?session=${json.data.id}&player=${playerB ? json.data.keyB : json.data.keyA}`;
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    }

    if (loading) return <><p className='box'>Loading...</p></>;
    if (error) return <><p className='box'>Error: {error}</p></>;
    if (sessionID && !session) return <><p className='box'>Processing...</p></>;

    const playerB = playerKey === session?.keyB;
    const headline = playerB
    ? "You are invited to a round of Hero banning. Pick your Heroes, then proceed to the next step. Leave the tab open, until both players banned a hero."
    : "Pick your 3 Heroes, then proceed to the next step. Leave the tab open, until both players banned a hero."

    return (<>
        <div className='flex-column' style={{ flex: 1, marginBottom: 40 }}>
            <h3 className='headline box'>{headline}</h3>

            <HeroSelector onToggle={onToggle} />

            <form className="actionBox" method="post" id="createForm" onSubmit={(e) => handleSubmit(e, playerB)}>
                <button disabled={selectedImages.size !== 3} className='clickable work-sans-A margin-1' type='submit'>SELECT AND PROCEED</button>
            </form>
        </div>
        <div className="footer">
            <strong>Your Heroes: </strong>
            <strong>{[...selectedImages].map(i => i.split(' & ')[0]).join(', ')}</strong>
        </div>
    </>);
}
