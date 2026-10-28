import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

export default function MoviesDashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    fetchMovies();
  }, []);

  // Reiniciar a la primera página si el usuario realiza una búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('vote_average', { ascending: false });

    if (!error) setMovies(data);
    setLoading(false);
  };

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cálculos de paginación
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div style={{ color: '#fff' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 20px', borderRadius: '30px', 
            border: '1px solid #333', backgroundColor: 'rgba(0,0,0,0.6)', 
            color: '#fff', width: '100%', maxWidth: '400px', outline: 'none'
          }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading movies...</p>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {currentMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
            ))}
          </div>

          {/* Controles de Paginación */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px', borderRadius: '4px', border: 'none',
                  backgroundColor: currentPage === 1 ? '#000000' : '#e50914',
                  color: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold', transition: 'background-color 0.2s'
                }}
              >
                Previous
              </button>
              <span style={{ fontWeight: 'bold' }}>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 16px', borderRadius: '4px', border: 'none',
                  backgroundColor: currentPage === totalPages ? '#000000' : '#e50914',
                  color: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold', transition: 'background-color 0.2s'
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}