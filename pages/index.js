import Head from 'next/head'


import Landing from '../components/Landing';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Name, Place, Animal, Thing! | Online Multiplayer Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Landing />
      </main>
    </div>
  )
}
