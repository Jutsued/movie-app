const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6193a0db431493626cef95cea16d4d9d&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


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

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        fetchMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});

