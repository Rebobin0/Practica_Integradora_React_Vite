import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import CountryCard from './CountryCard';
import CountryModal from './CountryModal';

export default function CountriesDashboard() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    // Consulta exclusiva a Supabase, sin tocar la API pública
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('common_name', { ascending: true });

    if (!error) setCountries(data);
    setLoading(false);
  };

  const filteredCountries = countries.filter(c => {
    const matchesSearch = c.common_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? c.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
  });

  const uniqueRegions = [...new Set(countries.map(c => c.region))].filter(Boolean);

  return (
    <div>
      <div style={{
        /* MODIFICA AQUÍ: Contenedor de la barra de búsqueda y filtros (alineación y espacio) */
        display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            /* MODIFICA AQUÍ: Estilo del input de texto */
            padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: '1', minWidth: '200px'
          }}
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          style={{
            /* MODIFICA AQUÍ: Estilo del selector desplegable */
            padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minWidth: '150px'
          }}
        >
          <option value="">All regions</option>
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', fontWeight: 'bold' /* MODIFICA AQUÍ: Texto de carga */ }}>Loading...</p>
      ) : (
        <div style={{
          /* MODIFICA AQUÍ: El grid que define cuántas tarjetas caben por fila */
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {filteredCountries.map(country => (
            <CountryCard key={country.id} country={country} onClick={setSelectedCountry} />
          ))}
        </div>
      )}

      <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
    </div>
  );
}