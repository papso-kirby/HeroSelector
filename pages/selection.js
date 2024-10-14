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

  const searchParams = useSearchParams()
  const session = searchParams.get('session')
  const playerKey = searchParams.get('player')

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

  if (loading) return <Base><p>Loading...</p></Base>;
  if (error) return <Base><p>Error: {error}</p></Base>;
  if (!data) return <Base><p>Processing...</p></Base>;

  const json = JSON.parse(data);
  const heros = [json.heroA1, json.heroA2, json.heroA3];

  const playerA = playerKey === json.keyA;
  
  const playerBlink = `${protocol}//${host}:${port}/selection?session=${json.id}&player=${json.keyB}`;

  const aBansB = json.heroB1 
  ? <><HeroLine heros={heros}></HeroLine>
  <hr></hr>
  Select a Hero to ban
  <hr></hr></>
  : <>Wait</>

  if (playerA)
 
    return (
      <Base>
        <div className='flex-column'>
          
            <span>Send this <a target='blank' href={playerBlink}>link</a> to your opponent and wait for them to select their heros.</span> 
          <hr></hr>
          <button className='clickable work-sans-A' type='button' onClick={() => navigator.clipboard.writeText(playerBlink)}>COPY LINK</button>

          {/* <h1>Your Heros</h1>
          <HeroLine heros={heros}></HeroLine> */}

          <h1>Your Opponent's Heros</h1>
          {aBansB}
          
          <button disabled={true} className='clickable work-sans-A' type='submit'>SELECT AND PROCEED</button>

        </div>
      </Base>
    );
    
    return (
      <Base>
        PLAYER B
      </Base>

    );
}
