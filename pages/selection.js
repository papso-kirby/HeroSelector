import Base from '@components/Base'
import HeroLine from '@components/HeroLine';
import { useSearchParams } from 'next/navigation'
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

    const toggleImage = (name) => {
        const newSelectedImages = new Set(selectedImages);

        if (newSelectedImages.has(name)) {
            newSelectedImages.delete(name);
        } else {
            newSelectedImages.add(name);
        }

        setSelectedImages(newSelectedImages);
    };

    const json = JSON.parse(data);
    const herosA = [json.heroA1, json.heroA2, json.heroA3];
    const herosB = [json.heroB1, json.heroB2, json.heroB3];

    const playerA = playerKey === json.keyA;

    const playerBlink = `${protocol}//${host}:${port}?session=${json.id}&player=${json.keyB}`;

    const aBansB = json.heroB1
        ? <>
            <HeroLine heros={herosB} selectedImages={selectedImages} onToggle={toggleImage}></HeroLine>
            <hr></hr>
            <hr></hr>
            Select a Hero to ban
            <hr></hr>
        </>
        : <>
            Please wait...
            <HeroLine heros={herosB}></HeroLine>
        </>



    if (playerA)

        return (
            <Base>
                <div className='flex-column'>

                    <span>Send this <a target='blank' href={playerBlink}>link</a> to your opponent and wait for them to select their heros.</span>
                    <hr></hr>
                    <button className='clickable work-sans-A' type='button' onClick={() => navigator.clipboard.writeText(playerBlink)}>COPY LINK</button>

                    <h1>Your Opponent's Heros</h1>
                    {aBansB}

                    <hr></hr>
                    <button disabled={selectedImages.size != 1} className='clickable work-sans-A' type='submit'>SELECT AND BAN</button>

                </div>
            </Base>
        );
    return (
        <Base>
            <div className='flex-column'>
                <h1>Your Opponent's Heros</h1>
                <HeroLine heros={herosA} selectedImages={selectedImages} onToggle={toggleImage}></HeroLine>
                <hr></hr>
                <hr></hr>
                Select a Hero to ban
                <hr></hr>

                <hr></hr>
                <button disabled={selectedImages.size != 1} className='clickable work-sans-A' type='submit'>SELECT AND BAN</button>

            </div>
        </Base>
    )

}
