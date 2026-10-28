import { useState } from 'react';
import { supabase } from "../supabase";

import CountriesDashboard from './CountriesDashboard';

export default function Dashboard({ session }) {
  const [activeTab, setActiveTab] = useState('countries');

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const userName = session?.user?.user_metadata?.user_name || 'Explorador';

  const palettes = {
    countries: {
      background: '#AEB784',
      text: '#F8F3E1',
      header: '#41431B',
      buttonActive: '#E3DBBB'
    },
    movies: {
      background: '#141414', // Oscuro tipo Netflix
      text: '#FFFFFF',
      header: '#000000',
      buttonActive: '#BC0202' // Rojo Netflix
    }
  };

  const currentTheme = palettes[activeTab];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: currentTheme.background, color: currentTheme.text, fontFamily: 'sans-serif', transition: 'background-color 0.3s ease' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: currentTheme.header, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Welcome, {userName}</span>
        <button
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#BC0202', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </header>
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveTab('countries')}
            style={{ padding: '10px 20px', backgroundColor: activeTab === 'countries' ? currentTheme.buttonActive : '#555', color: activeTab === 'countries' ? '#41431B' : '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Countries Explorer
          </button>
          <button 
            onClick={() => setActiveTab('movies')}
            style={{ padding: '10px 20px', backgroundColor: activeTab === 'movies' ? currentTheme.buttonActive : '#555', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Movies Explorer
          </button>
        </div>

        {activeTab === 'countries' ? <CountriesDashboard /> : <h2 style={{ textAlign: 'center' }}>Movies Dashboard coming soon...</h2>}
      </main>
    </div>
  );
}