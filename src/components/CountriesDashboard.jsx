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
        display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px', borderRadius: '6px', border: '1px solid #ccc', flex: '1', minWidth: '200px'
          }}
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          style={{
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
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Loading...</p>
      ) : (
        <div style={{
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