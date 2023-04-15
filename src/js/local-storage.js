import refs from './refs.js';

const dataStorage = {
  watched: [],
  queue: [],
};

let filmId = null;

//Перевірити наявність данних у сховищі
//Створити, якщо данні відсутні

function checkLocalStorage() {
  if (!localStorage.getItem('watched')) {
    localStorage.setItem('watched', JSON.stringify(dataStorage.watched));
  }
  if (!localStorage.getItem('queue')) {
    localStorage.setItem('queue', JSON.stringify(dataStorage.queue));
  }
}

checkLocalStorage();

// Слухачі на кнопки модалки

export function addModalButtonListeners() {
  // Слухачі подій на кнопки

  const addToWatched = document.querySelector('#add-to-watched-btn');
  console.log(addToWatched);

  const addToQueue = document.querySelector('#add-to-queue-btn');
  console.log(addToQueue);

  addToWatched.addEventListener('click', onAddToWatched);
  addToQueue.addEventListener('click', onAddToQueue);

  // по кліку на кнопку витянути дата-атрибут з модалки
  filmId = refs.modalMovie.dataset.id;
  console.log(filmId);

  if (isMovieExist(filmId, 'queue')) {
    addToQueue.textContent = "Remove from Queue";
    addToQueue.classList.add('added');
  }
  if (isMovieExist(filmId, 'watched')) {
    addToWatched.textContent = "Remove from Watched";
    addToWatched.classList.add('added');
  }
}

function isMovieExist(id, key) {
  const serializedState = JSON.parse(localStorage.getItem(key)) || [];
  return serializedState.find(obj => obj.id == id);
  }

export function removeListeners() {
  const addToWatched = document.querySelector('#add-to-watched-btn');
  const addToQueue = document.querySelector('#add-to-queue-btn');

  addToWatched.removeEventListener('click', onAddToWatched);
  addToQueue.removeEventListener('click', onAddToQueue);
}

function onAddToWatched() {
  const film = getFilm(filmId); 

  const addToWatched = document.querySelector('#add-to-watched-btn');
  addToWatched.classList.toggle('added');

  if (addToWatched.classList.contains("added")) {
    addMovieToStorage('watched', film);
    addToWatched.textContent = "Remove from Watched";
  } else {
    removeMovieFromStorage('watched', filmId);
    addToWatched.textContent = "Add to Watched";
  }
}

function onAddToQueue() {
  const film = getFilm(filmId); 

  const addToQueue = document.querySelector('#add-to-queue-btn');
  addToQueue.classList.toggle('added');

  if (addToQueue.classList.contains("added")) {
    addMovieToStorage('queue', film);
    addToQueue.textContent = "Remove from Queue";
  } else {
    removeMovieFromStorage('queue', filmId);
    addToQueue.textContent = "Add to Queue";
  }
}

// Завантажити фільм з таким же айді з лoкального сховища

function getFilm(id) {
  const films = loadFilms();
  return films.find(obj => obj.id == id);
}

export function loadFilms(key) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    const films = serializedState || [];
    return films;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
// Додати новий елемент в локальне сховище

function addMovieToStorage(key, film) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    serializedState.push(film);
    localStorage.setItem(key, JSON.stringify(serializedState));
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// Видалити фільм
function removeMovieFromStorage(key, id) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    const newFilms = serializedState.filter(obj => obj.id != id);
    localStorage.setItem(key, JSON.stringify(newFilms));
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
