// descargar peliculas

const downloadMovies = (movies) => {
  movies.forEach((typeMovie) => {
    fetch("http://www.omdbapi.com/?s=" + typeMovie + "apiKey=" + apiKey);
    fetch(`http://www.omdbapi.com/?s=${typeMovie}&apiKey=${apiKey}`).then(
      async (res) => {
        let data = JSON.parse(await res.text()).Search;
        console.log(data);
        printMovies(typeMovie, analizeData(data));
      }
    );
  });
};
// tratamiento de las peliculas
const analizeData = (movies) => {
  return movies.map((movie) => ({
    ...movie,
    Poster:
      movie.Poster === "N/A"
        ? "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
        : movie.Poster,
  }));
};

// pintar peliculas

const printMovies = (typeMovie, movies) => {
  let mainSection = document.getElementById("mainSection");
  mainSection.innerHTML += `
    <div class="movie__section">
        <h1>Movies about ${typeMovie}</h1>
        <div class="mainSection__carousel" id="section${typeMovie}">
        </div>
    </div>
    `;
  let sectionMovie = document.getElementById(`section${typeMovie}`);
  movies.forEach((movie) => {
    sectionMovie.innerHTML += `
        <div class="carouselCard">
            <img src="${movie.Poster} alt="${movie.Title}">
            <div class="carouselText">
                <h2>${movie.Title}</h2>
            </div>
        </div>
    `;
  });
};
// call descargar peliculas
downloadMovies(["Iron Man", "Spiderman"]);
