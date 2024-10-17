import Head from 'next/head';
import Header from '@components/Header';

export default function Base(props) {
    return (
        <>
            <Head>
                <title>Ban My Hero!</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
               
            </Head>
            <main>
                <div className="headerBox">
                    <Header title="Ban My Hero" />
                </div>
                {props.children}
            </main>
        </>
    )
}
