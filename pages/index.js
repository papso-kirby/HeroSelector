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

        <div class="headerBox">
          <Header title="Ban My Hero" />
        </div>

        <div class="selectorBox">
          <HeroSelector />
        </div>

        <form action="posi" method="post">

        <p>
          <h3>Select your 3 Heros!</h3>
        </p>
        <p>
          Your heros:
        </p>
          <button>Save</button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
