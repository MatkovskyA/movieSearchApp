//получаем элементы HTML
const btnSearchNode = document.querySelector(".button");
let inputNode = document.querySelector('.input-text');
const messageErrorNode = document.querySelector('.search-error');
const ulList = document.querySelector('.list');
const movieCardInfo = document.querySelector('.movie-card');
const btnMovieCardBack = document.querySelector('.btn-back');


btnSearchNode.addEventListener('click', searchMovie)



async function findMovies(movieTitle) {
    const res = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=7e07b9f6`);
    const data = await res.json();
    if(data.Response === "False") {
        messageErrorNode.classList.remove('hidden')
    } else {
        showMovies(data.Search)
    }
    
}


//получаем вводимые данные из инпута и отправляем его в поиск на сервер
function searchMovie() { 
    let movieTitle = inputNode.value.trim();
    if(!movieTitle) {
        return messageErrorNode.classList.remove('hidden')
    } else {
        messageErrorNode.classList.add('hidden')
        inputNode.focus()
    }
    findMovies(movieTitle);
    ulList.classList.remove('hidden');
    inputNode.value = ''
}


//отрисовываем список полученных фильмов
function showMovies(movies){
    let moviesList = '';

    movies.map(movie => {
        let movieImg = 'resourses/block.jpeg';
        if(movie.Poster !== "N/A;") {
            movieImg = movie.Poster;
        }
        moviesList += `
        <li>
            <a href="" class='list-style'>
                <img src='${movie.Poster}' class='movie-img-style' alt='movie image'</img>
                <div class="movie-content">
                    <h1 class='movie-title-style'>${movie.Title}</h1>
                    <p>${movie.Type}</p>
                    <p>Год выпуска: ${movie.Year}</p>
                </div>
            </a>
        </li>
        `
    })
    ulList.innerHTML = moviesList;
    getMovieCard()
}
//-------------------------------------------------------
// ДОДЕЛАТЬ - ОСТАНОВИЛСЯ НА ПОЛУЧЕНИИ ID ФИЛЬМА!!!
// получаем информацию о фильме по id
function getMovieCard(e) {
    const movieListCard = ulList.querySelectorAll('.list-style');
    movieListCard.forEach((movie) => {
        movie.addEventListener('click', async () => {
            // ulList.classList.remove('hidden');
            const res = await fetch(`https://www.omdbapi.com/?i=${movie.id}&apikey=7e07b9f6`)
            const movieCard = await res.json();
            
            // movieCardInfo.classList.remove('.hidden')
            showMovieCard(movieCard)
            
        })
        
    })
}
// функция отображает карточку фильма со всей информацией

function showMovieCard(movie) {
    let movieCardInfo = '';
    movieCardInfo.innerHTML = `
    <button class="btn-back"></button>
    <div class="movie-card-info">
        <img src='${movie.Poster}' class='movie-img-style' alt='movie image'</img>
        <div class="movie-card-about">
            <h3 class="movie-card-title">${movie.Title}</h3>
            <p class="movie-card-year">${movie.Year}</p>
            <p class="movie-card-rating">${movie.Rated}</p>
            <p class="movie-card-release">${movie.Released}</p>
            <p class="movie-card-duration">${movie.Runtime}</p>
            <p class="movie-card-genre">${movie.Genre}</p>
            <p class="movie-card-director">${movie.Director}</p>
            <p class="movie-card-scenario">${movie.Scenario}</p>
            <p class="movie-card-actors">${movie.Actors}</p>
        </div>
    </div>
    <div class="movie-card-description">
        <p class:"plot">${movie.Plot}</p>
    </div>
    `
}
// async function findMovies(movieTitle) {
//     const res = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=7e07b9f6`);
//     const data = await res.json();
//     if(!res.ok) {
//         messageErrorNode.classList.remove('hidden')
//     } else {
//         showMovies(data.Search)
//     }
    
// }

// function showMovieInfo(movies) { 
//     let movieId = movie.imdbID
// }

// getMovieCard(movieId)

// чистим инпут и возвращаем  фокус 
function clearAndFocusInput() { 
    movieTitle.value = '';
    movieTitle.focus();
}


//     loadMovieInfo();
//   }
  
//   // получаем всю информацию о фильме по id при клике
//   function loadMovieInfo() {
//     const searchListMovies = searchList.querySelectorAll(".search__list-movie");
//     // дальше для каждого элемента из коллекции searchListMovies:
//     searchListMovies.forEach((movie) => {
//       movie.addEventListener("click", async () => {
//         searchList.classList.add("search__list-hide");
//         const url = `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=57e731e0`;
//         const res = await fetch(`${url}`);
//         const movieInfo = await res.json();
//         showMovieInfo(movieInfo);
//       });
//     });
//   }
  
//   // показываем всю информацию о выбранном фильме и
//   // создаем разметку в списке результатов после выбора
//   function showMovieInfo(movie) {
//     resultNode.innerHTML = `
//       <div class="result__movie-img">
//         <img src="${
//           movie.Poster !== "N/A" ? movie.Poster : "resources/no-img.png"
//         }" alt="movie-poster" />
//       </div>
//       <div class="result__movie-info">
//         <h3 class="movie__title">${movie.Title}</h3>
//         <ul class="movie__info-list">
//           <li class="year">Year: ${movie.Year}</li>
//           <li class="rated">Ratings: ${movie.Rated}</li>
//           <li class="released">Released: ${movie.Released}</li>
//         </ul>
//         <p class="genre">Genre: ${movie.Genre}</p>
//         <p class="writer">
//           Writer: ${movie.Writer}
//         </p>
//         <p class="actors">
//           Actors: ${movie.Actors}
//         </p>
//         <p class="plot">
//           Plot: ${movie.Plot}
//         </p>
//         <p class="language">Language: ${movie.Language}</p>
//         <p class="awards">Awards: ${movie.Awards}</p>
//       </div>
//     `;
//   }
  
//   // cлушатели событий---------------------------------------------
  
//   // запуск функции, когда символ нажат и отпущен
//   inputNode.addEventListener("keyup", findMovies);
  
//   inputNode.addEventListener("click", findMovies);
  
//   // скрывает выпадающий список по нажатию где-либо вне инпута
//   window.addEventListener("click", (e) => {
//     if (e.target.className !== "search__input") {
//       searchList.classList.add("search__list-hide");
//     }
//   });
  