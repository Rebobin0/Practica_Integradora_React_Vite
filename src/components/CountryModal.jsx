export default function CountryModal({ country, onClose }) {
  if (!country) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', zIndex: 1000
    }}>
      <div style={{
        /* MODIFICA AQUÍ: Caja blanca del modal (color, bordes, ancho máximo) */
        backgroundColor: '#F8F3E1', color: '#41431B',
        padding: '2rem', borderRadius: '12px',
        maxWidth: '500px', width: '100%', position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            /* MODIFICA AQUÍ: Botón de cerrar X (tamaño, posición, color) */
            position: 'absolute', top: '15px', right: '15px',
            background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#41431B'
          }}
        >
          ✖
        </button>
        <img src={country.flag_url} alt="Flag" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>{country.common_name}</h2>
        <p><strong>Official Name:</strong> {country.official_name}</p>
        <p><strong>Region:</strong> {country.region} - {country.subregion}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Currency:</strong> {country.currency}</p>
        <p><strong>Government Type:</strong> {country.government_type}</p>
      </div>
    </div>
  );
}