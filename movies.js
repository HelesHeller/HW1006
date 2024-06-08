document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('movieTitle').value;
    const type = document.getElementById('movieType').value;
    fetchMovies(title, type, 1);
});

async function fetchMovies(title, type, page) {
    const apiKey = '5a3226a4'; // Замените 'YOUR_API_KEY' на ваш API ключ
    const url = `https://www.omdbapi.com/?s=${title}&type=${type}&page=${page}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
        displayMovies(data.Search, data.totalResults, title, type, page);
    } else {
        document.getElementById('results').innerHTML = `<p>Movie not found!</p>`;
        document.getElementById('pagination').innerHTML = '';
    }
}

function displayMovies(movies, totalResults, title, type, page) {
    const results = document.getElementById('results');
    results.innerHTML = '';
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <button onclick="fetchMovieDetails('${movie.imdbID}')">Details</button>
        `;
        results.appendChild(movieDiv);
    });

    const totalPages = Math.ceil(totalResults / 10);
    displayPagination(totalPages, title, type, page);
}

function displayPagination(totalPages, title, type, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.disabled = true;
        }
        button.addEventListener('click', () => fetchMovies(title, type, i));
        pagination.appendChild(button);
    }
}

async function fetchMovieDetails(id) {
    const apiKey = '5a3226a4'; // Замените 'YOUR_API_KEY' на ваш API ключ
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
        displayMovieDetails(data);
    }
}

function displayMovieDetails(movie) {
    const results = document.getElementById('results');
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');
    movieDetails.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
    `;
    results.appendChild(movieDetails);
}
