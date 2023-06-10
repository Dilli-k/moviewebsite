const API_KEY = 'api_key=ff66bab726f1691ab37b93e8322b3905';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = `${BASE_URL}/search/movie?${API_KEY}`;

function displayMovies(data) {
  const ans = data.results;
  let data1 = "";
  ans.map(values => {
    let color = "";
    if (values.vote_average >= 7.5) {
      color = "green";
    } else if (values.vote_average >= 6 && values.vote_average < 7.5) {
      color = "orange";
    } else {
      color = "red";
    }
    const rating = values.vote_average.toFixed(1); // Limit rating to 1 decimal place
    data1 += `
      <div class="grid">
        <div class="thumbnail-row">
          <div class="thumbnail-container">
            <img class="thumbnail" src="${IMG_URL}${values.poster_path}" alt="" onclick="showDescription(event, '${values.title}', '${values.overview}', '${IMG_URL}${values.poster_path}')"/>
          </div>
        </div>
        <p class="title">${values.title}</p>
        <p style="color: ${color}">${rating}</p>
      </div>
    `;
  });
  document.getElementById("container").innerHTML = data1;
}

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    displayMovies(data);

    // Add event listener to hide description on click outside
    document.addEventListener("click", function(event) {
      if (!event.target.classList.contains("thumbnail")) {
        hideDescription();
      }
    });
  })
  .catch(error => console.log('ERROR'));
  

function showDescription(event, title, description, posterUrl) {
  const container = document.getElementById("container");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  container.appendChild(overlay);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container"); 

  const posterElement = document.createElement("img");
  posterElement.src = posterUrl;
  descriptionContainer.appendChild(posterElement);

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  descriptionContainer.appendChild(titleElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;
  descriptionContainer.appendChild(descriptionElement);

  overlay.appendChild(descriptionContainer);

  // Prevent click event propagation to the document
  event.stopPropagation();
}

function hideDescription() {
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
  }
}

function searchMovies() {
  const searchValue = document.getElementById("searchBar").value;
  const url = searchValue ? `${searchURL}&query=${searchValue}` : API_URL;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayMovies(data);
    })
    .catch(error => console.log('ERROR'));
 
}

document.getElementById("searchBar").addEventListener("input", searchMovies);

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".movies").addEventListener("click", function() {
    location.reload();
  });
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".logo").addEventListener("click", function() {
    location.reload();
  });
});

