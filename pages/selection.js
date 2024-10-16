import Base from '@components/Base';
import HeroLine from '@components/HeroLine';
import Spacer from '@components/Spacer';
import OpponentLink from '@components/OpponentLink';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function CreateNew() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [protocol, setprotocol] = useState('');
    const [selectedImages, setSelectedImages] = useState(new Set());
    const [polling, setPolling] = useState(true);
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.hostname);
            setPort(window.location.port || '80');
            setprotocol(window.location.protocol);
        }
    }, []);

    useEffect(() => {
        if (session) {
            let intervalId;
            const fetchData = async () => {
                try {
                    const response = await fetch(`/get/${session}`);
                    if (!response.ok) {
                        console.log(`Error: ${response.statusText}`);
                    }

                    const result = await response.json();
                    const s = JSON.parse(result.data);
                    if (s.heroB1) {
                        setData(result.data);
                        setPolling(false);
                        if (intervalId) {
                            clearInterval(intervalId);
                        }
                    }
                } catch (err) {
                    setError(err.message);
                    setPolling(false);
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                }
            };
            intervalId = setInterval(fetchData, 5000);
            fetchData();
            return () => {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            };
        }
    }, [session]);

    if (loading) return <Base><p>Loading...</p></Base>;
    if (error) return <Base><p>Error: {error}</p></Base>;
    if (!data) return <Base><p>Processing...</p></Base>;

    async function handleSubmit(e, playerB) {
        e.preventDefault();
        const heroToBan = [...selectedImages][0];
        try {
            const response = await fetch(`/ban/${session}`, {
                method: 'POST',
                body: JSON.stringify({
                    playerKey: playerKey,
                    hero: heroToBan,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();
            window.location.href = `/result?session=${json.data.id}&player=${playerB ? json.data.keyB : json.data.keyA}`;
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    }

    const toggleImage = (name) => {
        const newSelectedImages = new Set(selectedImages);

        if (newSelectedImages.has(name)) {
            newSelectedImages.delete(name);
        } else {
            newSelectedImages.add(name);
        }

        setSelectedImages(newSelectedImages);
    };

    const state = JSON.parse(data);
    const heroesA = [state.heroA1, state.heroA2, state.heroA3];
    const heroesB = [state.heroB1, state.heroB2, state.heroB3];

    const playerA = playerKey === state.keyA;
    const playerB = !playerA;

    const OuterPage = ({ headerContent, children }) => {
        return (<Base>
            <div className='flex-column'>
                {headerContent}
                <h1>Your Opponent's Heroes</h1>
                {children}
                <Spacer />
                <Spacer />
                <form className="actionBox" method="post" id="banForm" onSubmit={(e) => handleSubmit(e, playerB)}>
                    <h3>Select a Hero to ban</h3>
                    <Spacer />
                    <button disabled={selectedImages.size != 1} className='clickable work-sans-A' type='submit'>SELECT AND BAN</button>
                </form>
            </div>
        </Base>)
    }

    if (playerA) {
        const playerBlink = `${protocol}//${host}:${port}?session=${state.id}&player=${state.keyB}`.replace(':80', '');
        const playerBhasHeroesSelected = !!state.heroB1;

        return (
            <OuterPage headerContent={<OpponentLink link={playerBlink} />}>
                {playerBhasHeroesSelected
                    ? <>
                        <HeroLine heroes={heroesB} selectedImages={selectedImages} onToggle={toggleImage}></HeroLine>
                    </>
                    : <>
                        Please wait for your opponent to select their heroes...
                        <HeroLine heroes={heroesB}></HeroLine>
                    </>}
            </OuterPage>
        );
    }

    return (
        <OuterPage>
            <HeroLine heroes={heroesA} selectedImages={selectedImages} onToggle={toggleImage}></HeroLine>
        </OuterPage>)
}
