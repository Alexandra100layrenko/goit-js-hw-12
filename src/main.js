import PixabayAPI from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  handleError,
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
    handleError(error);
  } finally {
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
    await fetchAndRenderImages(currentQuery, currentPage);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRenderImages(currentQuery, currentPage);
});

/*
import PixabayAPI from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  handleError,
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
    if (data.hits.length === 0) {
      showEndMessage();
      loadMoreBtn.classList.add('hidden');
      return;
    }
    renderGallery(data.hits);

    if (data.hits.length < 15 || data.hits.length + (page - 1) * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      if (data.hits.length + (page - 1) * 15 >= data.totalHits) {
        showEndMessage();
      }
    }

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
    handleError(error);
  } finally {
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
    await fetchAndRenderImages(currentQuery, currentPage);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRenderImages(currentQuery, currentPage);
});

*/