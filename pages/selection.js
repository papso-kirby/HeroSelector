import HeroLine from '@components/HeroLine';
import Spacer from '@components/Spacer';
import OpponentLink from '@components/OpponentLink';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { getSession } from '../services/apiService';
import { postData } from 'services/apiService';
import sessionEffect from '../shared/effects';

export default function CreateNew() {

    const [url, setUrl] = useState(null);

    const [selectedImages, setSelectedImages] = useState(new Set());
    const [polling, setPolling] = useState(true);

    const searchParams = useSearchParams();
    const sessionID = searchParams.get('session');
    const playerKey = searchParams.get('player');

    const [session, loading, error, setSession, setLoading, setError] = sessionEffect(sessionID);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const host = window.location.hostname;
            const port = window.location.port || '80';
            const protocol = window.location.protocol;
            const url = `${protocol}//${host}:${port}`.replace(':80', '');
            setUrl(url);
        }
    }, []);

    useEffect(() => {
        if (sessionID) {
            let intervalId;
            const fetchSession = async () => {
                try {
                    const session = await getSession(sessionID);
                    if (session.heroB1) {
                        setSession(session);
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
            intervalId = setInterval(fetchSession, 5000);
            fetchSession();
            return () => {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            };
        }
    }, [sessionID]);

    if (loading) return <><p className='box'>Loading...</p></>;
    if (error) return <><p className='box'>Error: {error}</p></>;
    if (!session) return <><p className='box'>Processing...</p></>;

    async function handleSubmit(e, playerB) {
        e.preventDefault();
        const heroToBan = [...selectedImages][0];
        try {
            const json = await postData(`/ban/${sessionID}`, 
            {
                playerKey: playerKey,
                hero: heroToBan,
            });

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

    const heroesA = [session.heroA1, session.heroA2, session.heroA3];
    const heroesB = [session.heroB1, session.heroB2, session.heroB3];

    const playerA = playerKey === session.keyA;
    const playerB = !playerA;

    const OuterPage = ({ headerContent, children }) => {
        return (<>
            <div className='flex-column'>
                {headerContent}
                <h1 className='box'>Select a Hero to ban</h1>
                <h2>Your Opponent's Heroes:</h2>
                {children}
                <Spacer />
                <Spacer />
                <form className="actionBox" method="post" id="banForm" onSubmit={(e) => handleSubmit(e, playerB)}>
                    <button disabled={selectedImages.size != 1} className='clickable work-sans-A' type='submit'>SELECT AND BAN</button>
                </form>
                <Spacer />
                <Spacer />
            </div>
        </>)
    }

    if (playerA) {
        const playerBlink = `${url}?session=${session.id}&player=${session.keyB}`;
        const playerBhasHeroesSelected = !!session.heroB1;
        return (
            <OuterPage headerContent={playerBhasHeroesSelected ? <></> : <OpponentLink link={playerBlink} />}>
                {playerBhasHeroesSelected
                    ? <>
                        <HeroLine heroes={heroesB} selectedImages={selectedImages} onToggle={toggleImage}></HeroLine>
                    </>
                    : <>
                        <span className='margin-1'>Please wait for your opponent to select their heroes. Do not close this tab.</span>
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
