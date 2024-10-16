import Head from 'next/head';
import Header from '@components/Header';

export default function Base(props) {
    return (
        <>
            <Head>
                <title>Ban My Hero!</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
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
