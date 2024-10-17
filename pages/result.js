import HeroLine from '@components/HeroLine';
import Spacer from '@components/Spacer';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { getSession } from '../services/apiService';

export default function Result() {

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchParams = useSearchParams();
    const sessionID = searchParams.get('session');
    const [polling, setPolling] = useState(true);
    const playerKey = searchParams.get('player');

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setSession(await getSession(sessionID));
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        console.log(sessionID);
        if (sessionID) {
            fetchSession();
        } else {
            setLoading(false);
        }
    }, [sessionID]);

    useEffect(() => {
        if (sessionID) {
            let intervalId;
            const fetchSession = async () => {
                try {
                    const session = await getSession(sessionID);
                    if (session.ban1 && session.ban2) {
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

    if (loading) return <><p className='box'>Waiting for results...</p></>;
    if (error) return <><p className='box'>Error: {error}</p></>;
    if (!session) return <><p className='box'>Processing...</p></>;
    if (polling) return <><p className='box'>Waiting for your opponent...</p></>;

    const playerA = playerKey === session.keyA;
    const heroesA = [session.heroA1, session.heroA2, session.heroA3];
    const heroesB = [session.heroB1, session.heroB2, session.heroB3];

    return (<>
        <h1 className='box'>Results are in!</h1>
        <h2>Your heroes</h2>
        <HeroLine heroes={playerA ? heroesA : heroesB} banned={playerA ? session.ban2 : session.ban1}></HeroLine>
        <Spacer />
        <h2>Your Opponent's heroes</h2>
        <HeroLine heroes={playerA ? heroesB : heroesA} banned={playerA ? session.ban1 : session.ban2}></HeroLine>
        <Spacer />
        <Spacer />
    </>)
}