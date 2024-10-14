
import HeroSelector from '@components/HeroSelector'
import Base from '@components/Base'
import React, { useState } from 'react';

export default function Home() {

  const [selectedImages, setSelectedImages] = useState(new Set());

  const toggleSelected = (selected) => {
    setSelectedImages(selected);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const heros = [...selectedImages];
    try {
      const response = await fetch('/create', {
        method: 'POST',
        body: JSON.stringify({
          hero1: heros[0],
          hero2: heros[1],
          hero3: heros[2]
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      window.location.href = `/selection?session=${json.data.id}&player=${json.data.keyA}`;
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }

  return (<Base>
    <div>
      <div className="selectorBox">
        <HeroSelector onToggle={toggleSelected}/>
      </div>

      <form className="actionBox" method="post" id="createForm" onSubmit={handleSubmit}>

        <h3>Select your 3 Heros!</h3>


        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          Your heros:
          {[...selectedImages].map(i => <div key={i}> {i} </div>)}
        </div>

        <hr></hr>

        <button disabled={selectedImages.size !== 3} className='clickable work-sans-A' type='submit'>SELECT AND PROCEED</button>
      </form>
    </div>
  </Base>);
}
