import Head from 'next/head'


import Landing from '../components/Landing';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Play Game | Name, Place, Animal, Thing!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Landing />
      </main>
    </div>
  )
}
