const main = document.getElementById("main");
const main1 = document.getElementById("main1");
const form = document.getElementById("form");
const search = document.getElementById("search");
const lists = document.querySelectorAll('li');
const toggleBtn = document.querySelector(".toggle-button");
const navbarLinks = document.querySelector(".navbar-links");

const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6193a0db431493626cef95cea16d4d9d&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=6193a0db431493626cef95cea16d4d9d&query=";


async function fetchMovies(url) {
    let resp = await fetch(url);
    let respData = await resp.json();
    console.log(resp)
        
    showMovies(respData.results)
}


fetchMovies(APIURL);

function showMovies(movies) {
    
    main.innerHTML = "";

    movies.forEach((movie) => {
        let { poster_path, title, vote_average, overview } = movie;
        
        if(poster_path === null) {
            poster_path = "/A31EtMx1Jk1p4Si3d3EnCVHuqyM.jpg";
        } else {
           poster_path
        }

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

search.addEventListener("change", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        fetchMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});

//GENRE MOVIES NAV SELECTION
async function genreMovies(url) {
    let resp = await fetch(url);
    let respData = await resp.json();
    console.log(resp)
        
    showGenreMovies(respData.results)
}

document.querySelectorAll('.find').forEach(item => {
    item.addEventListener('click', e => {
      console.log(e.target.textContent)
  
      const searchTerm = e.target.id;
      const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6193a0db431493626cef95cea16d4d9d&with_genres=${searchTerm}`;
  
      if (searchTerm) {
        genreMovies(url)
      }
    })
  })

function showGenreMovies(movies) {
    
    main.innerHTML = "";

    movies.forEach((movie) => {
        let { poster_path, title, vote_average, overview } = movie;
        
        if(poster_path === null) {
            poster_path = "/A31EtMx1Jk1p4Si3d3EnCVHuqyM.jpg";
        } else {
           poster_path
        }

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}



window.onscroll = function() {myFunction()};

var header = document.getElementById('test');
var stick = header.offsetTop;

function myFunction() {
    if(window.pageYOffset > stick) {
        header.classList.add('stick'); 
    } else {
        header.classList.remove('stick')
    }
}

toggleBtn.addEventListener('click', function(){
  navbarLinks.classList.toggle('active')
});