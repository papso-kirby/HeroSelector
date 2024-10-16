import HeroSelector from '@components/HeroSelector';
import Spacer from '@components/Spacer';
import Base from '@components/Base';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImages, setSelectedImages] = useState(new Set());

    const onToggle = (selected) => setSelectedImages(selected)

    const searchParams = useSearchParams();
    const session = searchParams.get('session');
    const playerKey = searchParams.get('player');

    useEffect(() => {
        if (session) {
            fetch(`/get/${session}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [session]);

    async function handleSubmit(e, playerB) {
        e.preventDefault();
        const heroes = [...selectedImages];
        try {
            const response = await fetch(playerB ? `/join/${session}`  : '/create', {
                method: 'POST',
                body: JSON.stringify({
                    hero1: heroes[0],
                    hero2: heroes[1],
                    hero3: heroes[2]
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();
            window.location.href = `/selection?session=${json.data.id}&player=${playerB ? json.data.keyB : json.data.keyA}`;
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    }

    if (loading) return <Base><p>Loading...</p></Base>;
    if (error) return <Base><p>Error: {error}</p></Base>;
    if (session && !data) return <Base><p>Processing...</p></Base>;

    const json = JSON.parse(data ?? '{}');
    const playerB = playerKey === json.keyB;
    const headline = playerB
    ? "You are invited to choose your Heroes!"
    : "Start a new round of Hero banning!"

    return (<Base>
        <h3>{headline}</h3>

        <div className="selectorBox">
            <HeroSelector onToggle={onToggle} />
        </div>

        <form className="actionBox" method="post" id="createForm" onSubmit={(e) => handleSubmit(e, playerB)}>

            <h3>Select your 3 Heroes!</h3>


            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                Your Heroes:
                {[...selectedImages].map(i => <div key={i}> {i} </div>)}
            </div>

            <Spacer />

            <button disabled={selectedImages.size !== 3} className='clickable work-sans-A' type='submit'>SELECT AND PROCEED</button>
        </form>
    </Base>);
}
