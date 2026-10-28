import { supabase } from "../supabase";

export default function Login() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({provider: 'github'});
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1a', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '3rem', borderRadius: '12px', backgroundColor: '#2d2d2d', textAlign: 'center', boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }}>
        <h2 style={{ marginBottom: '2rem', color: '#ffffff' }}>APIs Explorer</h2>
        <button
          onClick={handleLogin}
          style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#24292e', color: 'white', border: '1px solid #444', borderRadius: '8px', fontWeight: 'bold', transition: '0.2s' }}
        >
          Login With GitHub
        </button>
      </div>
    </div>
  );
}