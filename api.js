const apiKey = '7e07b9f6';


function getMovies(searchQuery) {
    return fetch(`https://www.omdbapi.com/?s=${searchQuery}&apiKey=[${apiKey}]`)
    .then(data => data.json())
}