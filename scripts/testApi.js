import 'dotenv/config';

async function testAPIs() {
  try {
    console.log('--- DEMO TMDB (Páginas 1 y 2) ---');
    let allMovies = [];

    for (let page = 1; page <= 2; page++) {
      // Usamos api_key directo en la URL
      const tmdbUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=${page}`;
      const tmdbOptions = {
        method: 'GET',
        headers: { accept: 'application/json' }
      };

      const tmdbRes = await fetch(tmdbUrl, tmdbOptions);
      const tmdbData = await tmdbRes.json();
      if (tmdbData.results) allMovies = allMovies.concat(tmdbData.results);

    }

    console.log(`${allMovies.length} películas obtenidas.`);
    console.log('Ejemplo peli 1:', allMovies[0]);

    console.log('\n--- DEMO COUNTRIES API ---');
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
    
    if (allCountries.error || !Array.isArray(allCountries)) {
      console.error('Error de Countries:', allCountries);
    } else {
      console.log(`Total de países obtenidos: ${allCountries.length}`);
      console.log('Ejemplo país 1:', allCountries[10]);
    }

  } catch (error) {
    console.error('Error en la ejecución:', error);
  }
}

testAPIs();