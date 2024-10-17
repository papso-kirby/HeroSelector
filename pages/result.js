import Base from '@components/Base';
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
                        console.log(session)
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

    if (loading) return <Base><p>Waiting for results...</p></Base>;
    if (error) return <Base><p>Error: {error}</p></Base>;
    if (!session) return <Base><p>Processing...</p></Base>;
    if (polling) return <Base><p>Waiting for results...</p></Base>;

    const playerA = playerKey === session.keyA;
    const heroesA = [session.heroA1, session.heroA2, session.heroA3];
    const heroesB = [session.heroB1, session.heroB2, session.heroB3];

    return (<Base>
        <h3>Your heroes</h3>
        <HeroLine heroes={playerA ? heroesA : heroesB} banned={playerA ? session.ban2 : session.ban1}></HeroLine>
        <Spacer />
        <h3>Your Opponent's heroes</h3>
        <HeroLine heroes={playerA ? heroesB : heroesA} banned={playerA ? session.ban1 : session.ban2}></HeroLine>
    </Base>)
}