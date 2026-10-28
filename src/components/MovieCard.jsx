export default function MovieCard({ movie, onClick }) {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div
      onClick={() => onClick(movie)}
      style={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        backgroundColor: '#222'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.8)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
      }}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '2/3' }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
          padding: '2rem 1rem 1rem',
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = 1}
        onMouseOut={(e) => e.currentTarget.style.opacity = 0}
      >
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', textShadow: '1px 1px 3px black' }}>{movie.title}</h3>
        <span style={{ fontSize: '0.8rem', color: '#46d369', fontWeight: 'bold' }}>⭐ {movie.vote_average?.toFixed(1)}</span>
      </div>
    </div>
  );
}