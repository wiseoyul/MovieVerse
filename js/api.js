const API_KEY = '1c03003fe2be3cffbeadd744fb3ebcff'; 
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


export async function fetchPopularMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    );
    if (!response.ok) throw new Error('영화 데이터를 불러오는 데 실패했습니다.');
    return await response.json();
  } catch (error) {
    console.error('fetchPopularMovies Error:', error);
    return { results: [], total_pages: 0 };
  }
}


export async function searchMovies(query, page = 1) {
  if (!query.trim()) return { results: [], total_pages: 0 };
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) throw new Error('검색 결과를 불러오는 데 실패했습니다.');
    return await response.json();
  } catch (error) {
    console.error('searchMovies Error:', error);
    return { results: [], total_pages: 0 };
  }
}


export async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
    );
    if (!response.ok) throw new Error('상세 정보를 불러오는 데 실패했습니다.');
    return await response.json();
  } catch (error) {
    console.error('fetchMovieDetails Error:', error);
    return null;
  }
}