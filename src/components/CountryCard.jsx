export default function CountryCard({ country, onClick}) {
  return (
    <div
      onClick={() => onClick(country)}
      style={{
        /* MODIFICA AQUÍ: Color de fondo, bordes, sombras y texto de la tarjeta */
        backgroundColor: '#E3DBBB',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        color: '#41431B'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.09)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src={country.flag_url} 
        alt={`Flag of ${country.common_name}`} 
        style={{ width: '100%', height: '160px', objectFit: 'cover' /* MODIFICA AQUÍ: Altura y ajuste de la bandera */ }}
      />
      <div style={{ padding: '1rem' /* MODIFICA AQUÍ: Espaciado interno de la tarjeta */ }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{country.common_name}</h3>
        <p style={{ margin: 0, color: '#41431B', fontSize: '1rem' }}>Region: {country.region}</p>
      </div>
    </div>
  );
}