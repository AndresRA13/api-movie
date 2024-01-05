
let pagina = 1;
    let totalPaginas = 1;

    const cargarPeliculas = async (pagina) => {
      try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=89bd3727826c10b308ce5d4bc04a2027&language=es-MX&page=${pagina}`);
        if (respuesta.status === 200) {
          const datos = await respuesta.json();
          totalPaginas = datos.total_pages;
          return datos.results;
        } else {
          console.log(`Error al cargar la página ${pagina}`);
          return [];
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const mostrarPeliculas = (peliculas) => {
      let peliculasHTML = '';
      peliculas.forEach(pelicula => {
        peliculasHTML += `
          <div class="pelicula">
            <div class="post">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h1 class="title">${pelicula.title}</h1>
            </div>
            <div class="info">
            <p>${pelicula.vote_count} Votes</p>
            <p class="date">${new Date(pelicula.release_date).getFullYear()}</p>
            </div>
          </div>
        `;
      });
      document.querySelector('#container').innerHTML = peliculasHTML;
    };

    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnBuscar = document.getElementById('btnBuscar');

    btnSiguiente.addEventListener('click', () => {
      if (pagina < totalPaginas) {
        pagina += 1;
        cargarPeliculas(pagina).then(peliculas => mostrarPeliculas(peliculas));
      }
    });

    btnAnterior.addEventListener('click', () => {
      if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas(pagina).then(peliculas => mostrarPeliculas(peliculas));
      }
    });

 
      const inputBusqueda = document.getElementById('inputBusqueda');

      inputBusqueda.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          realizarBusqueda();
        }
      });
      
      const realizarBusqueda = async () => {
        const query = inputBusqueda.value.toLowerCase();
        if (query.trim() !== '') {
          try {
            const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=89bd3727826c10b308ce5d4bc04a2027&language=es-MX&query=${query}&page=1`);
            if (respuesta.status === 200) {
              const datos = await respuesta.json();
              mostrarPeliculas(datos.results);
            } else {
              console.log('Error al realizar la búsqueda');
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          // Si la búsqueda está vacía, cargamos las películas populares.
          cargarPeliculas(1).then(peliculas => mostrarPeliculas(peliculas));
        }
      };
      
      // Llamamos a cargarPeliculas al cargar la página para obtener las películas populares.
      cargarPeliculas(1).then(peliculas => mostrarPeliculas(peliculas));
      
/** SECTION NAV BARS */
const openBars = document.querySelector('.open_bars');
const closeBars = document.querySelector('.close_bars');
const nav = document.querySelector('.nav');

openBars.addEventListener('click', (e) => {
  e.preventDefault();
  openBars.classList.add('close');
  closeBars.classList.add('open');
  nav.classList.add('openNav');
});

closeBars.addEventListener('click', (e) => {
  e.preventDefault();
  openBars.classList.remove('close');
  closeBars.classList.remove('open');
  nav.classList.remove('openNav');
});


//**/cheked input type check */

const inputCheck = document.querySelector('.cheked');
const body =  document.querySelector('.body');
function night(){
    body.classList.toggle('night');
}

const inputSearch = document.getElementById('inputBusqueda');
const btnSearch =  document.querySelector('.initial');
const btnPend = document.querySelector('.notPend');
btnSearch.addEventListener('click', () =>{
    inputSearch.classList.add('active');
    btnSearch.classList.add('active');
    btnPend.classList.add('active');
})
btnPend.addEventListener('click', () =>{
    inputSearch.classList.remove('active');
    btnSearch.classList.remove('active');
    btnPend.classList.remove('active');
    btnPend.style.position = 'absolute';
})