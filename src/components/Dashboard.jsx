import { supabase } from "../supabase";

export default function Dashboard({ session }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const userName = session?.user?.user_metadata?.user_name || 'Explorador';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f9', color: '#333', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Bienvenido, {userName}</span>
        <button
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </header>
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Panel Principal</h1>
      </main>
    </div>
  );
}