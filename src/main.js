import PixabayAPI from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showEndMessage,
} from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
let currentPage = 1;
let currentQuery = '';

async function fetchAndRenderImages(query, page) {
  try {
    showLoader();
    const data = await PixabayAPI.fetchImages(query, page);
    renderGallery(data.hits);
    hideLoader();

    if (data.hits.length < 15 || data.hits.length + (page - 1) * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      if (data.hits.length + (page - 1) * 15 >= data.totalHits) {
        showEndMessage();
      }
    }
    // Smooth scrolling
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length) {
      const { height } = galleryItems[0].getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    hideLoader();
  }
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = event.target.querySelector('.search-input');
  const query = input.value.trim();
  if (query && query !== currentQuery) {
    currentQuery = query;
    currentPage = 1;
    clearGallery();
    loadMoreBtn.classList.add('hidden');
    fetchAndRenderImages(currentQuery, currentPage);
  }
  showLoader();
  try {
    const images = await pixabayApi.fetchImages(query);
    renderGallery(images);
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  fetchAndRenderImages(currentQuery, currentPage);
});
