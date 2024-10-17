import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className='texturedBg'>
            <Head>
                <meta charSet="UTF-8" />
                <title>Ban My Hero!</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
            </Head>
            <body id='layout' className='flex-column container texturedBg'>
                <a href='/'>
                    <header className='headerBox'>
                        <h1>Ban My Hero!</h1>
                    </header>
                </a>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}