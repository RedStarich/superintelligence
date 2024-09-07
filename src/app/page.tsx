import Head from 'next/head';
import Header from './components/HeaderLanding';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import JoinUsSection from './components/JoinUsSection';
import Footer from './components/Footer';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Unimori.ai</title>
        <meta name="description" content="Платформа для поддержки студентов" />
        <meta property="og:title" content="Unimori.ai" />
        <meta property="og:description" content="Платформа для поддержки студентов" />
        <meta property="og:url" content="https://unimori1.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
      <Link href="/chat">
        <p>Chat</p>
      </Link>
    </div>
  );
};

export default Home;
