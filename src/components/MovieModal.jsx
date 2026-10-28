export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        backgroundColor: '#181818', color: '#fff',
        borderRadius: '12px', overflow: 'hidden',
        maxWidth: '800px', width: '100%', position: 'relative',
        display: 'flex', flexWrap: 'wrap',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '15px', right: '15px',
            background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
            width: '35px', height: '35px', fontSize: '1.2rem', cursor: 'pointer', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          ✖
        </button>
        
        <img 
          src={posterUrl} 
          alt={movie.title} 
          style={{ width: '100%', maxWidth: '300px', objectFit: 'cover' }} 
        />
        
        <div style={{ padding: '2rem', flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{movie.title}</h2>

          <h3 style={{ fontSize: '1.1rem', color: '#b3b3b3', fontStyle: 'italic', margin: '0 0 1rem 0', fontWeight: 'normal' }}>
            {movie.original_title}
          </h3>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#a3a3a3' }}>
            <span>{movie.release_date?.split('-')[0]}</span>
            <span style={{ color: '#46d369', fontWeight: 'bold' }}>⭐ {movie.vote_average?.toFixed(1)} Rating</span>
            <span>{movie.original_language?.toUpperCase()}</span>
          </div>
          <p style={{ lineHeight: '1.6', fontSize: '1rem', marginBottom: '2rem' }}>{movie.overview || 'No overview available.'}</p>
        </div>
      </div>
    </div>
  );
}