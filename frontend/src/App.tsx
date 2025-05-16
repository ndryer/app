import React, { Suspense, lazy } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import './App.css';
import { userData } from './data';

// Lazy load components for better performance
const Header = lazy(() => import('./components/Header'));
const Timeline = lazy(() => import('./components/Timeline'));
const Skills = lazy(() => import('./components/Skills'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingActionButton = lazy(() => import('./components/FloatingActionButton'));

function App() {
  return (
    <ParallaxProvider>
      <div className="App">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header userData={userData} />
          
          <main>
            <Timeline userData={userData} />
            <Skills userData={userData} />
          </main>
          
          <Footer userData={userData} />
          <FloatingActionButton email={userData.email} />
        </Suspense>
      </div>
    </ParallaxProvider>
  );
}

export default App;
