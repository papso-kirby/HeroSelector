import Base from '@components/Base';
import HeroLine from '@components/HeroLine';
import Spacer from '@components/Spacer';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Result() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchParams = useSearchParams();
    const session = searchParams.get('session');
    const [polling, setPolling] = useState(true);
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
                    if (s.ban1 && s.ban2) {
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

    if (loading) return <Base><p>Waiting for results...</p></Base>;
    if (error) return <Base><p>Error: {error}</p></Base>;
    if (!data) return <Base><p>Processing...</p></Base>;
    if (polling) return <Base><p>Waiting for results...</p></Base>;

    const state = JSON.parse(data);
    const playerA = playerKey === state.keyA;
    const heroesA = [state.heroA1, state.heroA2, state.heroA3];
    const heroesB = [state.heroB1, state.heroB2, state.heroB3];

    return (<Base>
        <h3>Your heroes</h3>
        <HeroLine heroes={playerA ? heroesA : heroesB} banned={playerA ? state.ban2 : state.ban1}></HeroLine>
        <Spacer />
        <h3>Your Opponent's heroes</h3>
        <HeroLine heroes={playerA ? heroesB : heroesA} banned={playerA ? state.ban1 : state.ban2}></HeroLine>
    </Base>)
}