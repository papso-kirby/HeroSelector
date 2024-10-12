import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import HeroSelector from '@components/HeroSelector'
import React, { useState } from 'react';

export default function Home() {

  const [selectedImages, setSelectedImages] = useState(new Set());

  const toggleSelected = (selected) => {
    console.log(selected);
    setSelectedImages(selected);
  }

  return (
    <div className="container">
      <Head>
        <title>Ban My Hero!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </Head>

      <main>

        <div className="headerBox">
          <Header title="Ban My Hero" />
        </div>

        <div className="selectorBox">
          <HeroSelector onToggle={toggleSelected} />
        </div>

        <form className="actionBox" action="posi" method="post">

          <h3>Select your 3 Heros!</h3>


          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            Your heros:
            {[...selectedImages].map(i => <div> {i} </div>)}
          </div>

          <hr></hr>

          <div className='clickable work-sans-A'>SELECT AND PROCEED</div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
