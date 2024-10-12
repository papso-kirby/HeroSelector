import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import HeroSelector from '@components/HeroSelector'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Ban My Hero!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Ban My Hero" />
        
        <HeroSelector />

        <p className="description">
          
        </p>


        <form action="posi" method="post">
          <label for="in">Test</label>
          <input id="in">
          </input>
          <button>CLICK!</button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
