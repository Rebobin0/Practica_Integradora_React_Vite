import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISH_KEY
);

async function seedData() {
  try {
    console.log('Iniciando carga de películas...');
    let allMovies = [];
    // Obtenemos 10 páginas (200 películas)
    for (let page = 1; page <= 10; page++) {
      const tmdbUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=${page}`;
      const res = await fetch(tmdbUrl, { headers: { accept: 'application/json' } });
      const data = await res.json();
      if (data.results) allMovies = allMovies.concat(data.results);
    }

    const moviesToInsert = allMovies.map(m => ({
      id: m.id,
      title: m.title,
      original_title: m.original_title,
      poster_path: m.poster_path,
      release_date: m.release_date,
      overview: m.overview,
      original_language: m.original_language,
      vote_average: m.vote_average
    }));

    const { error: mError } = await supabase.from('movies').upsert(moviesToInsert);
    if (mError) throw mError;
    console.log(`${moviesToInsert.length} películas insertadas.`);

    let allCountries = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;
    const fields = 'names.common,names.official,flag.url_png,region,subregion,government_type,population,currencies';

    // Ciclo para manejar la paginación de Rest Countries
    while (hasMore) {
      const countriesUrl = `https://api.restcountries.com/countries/v5?response_fields=${fields}&limit=${limit}&offset=${offset}`;
      const resCountries = await fetch(countriesUrl, {
        headers: { 'Authorization': `Bearer ${process.env.API_KEY_REST_COUNTRIES}` }
      });
      const cData = await resCountries.json();

      if (cData.data && cData.data.objects) {
        allCountries = allCountries.concat(cData.data.objects);
        hasMore = cData.data.meta.more;
        offset += limit;
      } else {
        hasMore = false;
      }
    }

    const countriesToInsert = allCountries.map(c => {
      const currencyKey = c.currencies ? Object.keys(c.currencies)[0] : null;
      return {
        common_name: c.names?.common,
        official_name: c.names?.official,
        flag_url: c.flag?.url_png || 'None',
        region: c.region || 'Unknown',
        subregion: c.subregion || 'Unknown',
        population: c.population || 0, 
        government_type: c.government_type || 'Unknown',
        currency: currencyKey ? c.currencies[currencyKey].name : 'Unknown'
      };
    });

    const { error: cError } = await supabase.from('countries').upsert(countriesToInsert);
    if (cError) throw cError;
    console.log(`${countriesToInsert.length} países insertados en la base de datos.`);

  } catch (error) {
    console.error('Error en la carga masiva:', error);
  }
}

seedData();