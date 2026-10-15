import { fetchPopularMovies, searchMovies, fetchMovieDetails, IMAGE_BASE_URL } from './api.js';
import { debounce } from './utils.js';    
import { setupInfiniteScroll } from './observer.js'; 

const state = {
  page: 1,
  searchQuery: '',
  isLoading: false,
  hasMore: true
};

const $movieGrid = document.getElementById('movieGrid');
const $searchInput = document.getElementById('searchInput');
const $sentinel = document.getElementById('sentinel');
const $modal = document.getElementById('movieModal');
const $modalBody = document.getElementById('modalBody');
const $closeModal = document.getElementById('closeModal');

function init() {
  loadMovies();
  setupInfiniteScroll($sentinel, handleScrollLoad);
  
  $searchInput.addEventListener('input', debounce(handleSearchInput, 300));
  
  
  $closeModal.addEventListener('click', closeModal);$modal.addEventListener('click', (e) => {
    if (e.target === $modal) closeModal();
  });

  window.addEventListener('popstate', handlePopState);
}


async function loadMovies() {
  if (state.isLoading || !state.hasMore) return;
  state.isLoading = true;

  let data;
  if (state.searchQuery) {
    data = await searchMovies(state.searchQuery, state.page);
  } else {
    data = await fetchPopularMovies(state.page);
  }

  if (data.results && data.results.length > 0) {
    renderMovieCards(data.results);
    state.page += 1;
    if (state.page > data.total_pages) state.hasMore = false;
  } else {
    state.hasMore = false;
    if (state.page === 1) {
      $movieGrid.innerHTML = '<p class="no-result">검색 결과가 없습니다.</p>';
    }
  }

  state.isLoading = false;
}

function handleScrollLoad() {
  if (!state.isLoading && state.hasMore) {
    loadMovies();
  }
}


function handleSearchInput(e) {
  const query = e.target.value.trim();
  state.searchQuery = query;
  state.page = 1;
  state.hasMore = true;
  $movieGrid.innerHTML = ''; 
  loadMovies();
}

function renderMovieCards(movies) {
  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const posterPath = movie.poster_path 
      ? `${IMAGE_BASE_URL}${movie.poster_path}` 
      : 'https://via.placeholder.com/500x750?text=No+Image';

    const $card = document.createElement('div');
    $card.className = 'movie-card';$card.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}" loading="lazy">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
      </div>
    `;

    $card.addEventListener('click', () => openModal(movie.id));
    fragment.appendChild($card);
  });

  $movieGrid.appendChild(fragment);
}

async function openModal(movieId) {
  const movie = await fetchMovieDetails(movieId);
  if (!movie) return;

  $modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <p class="tagline">${movie.tagline || ''}</p>
    <p><strong>개봉일:</strong> ${movie.release_date}</p>
    <p><strong>장르:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
    <p class="overview">${movie.overview || '상세 줄거리가 없습니다.'}</p>
  `;

  $modal.classList.remove('hidden');

  history.pushState({ movieId }, '', `?movie=${movieId}`);
}


function closeModal() {
  $modal.classList.add('hidden');
  if (history.state && history.state.movieId) {
    history.back();
  }
}

function handlePopState(e) {
  if (!e.state || !e.state.movieId) {
    $modal.classList.add('hidden');
  } else {
    openModal(e.state.movieId);
  }
}

document.addEventListener('DOMContentLoaded', init);