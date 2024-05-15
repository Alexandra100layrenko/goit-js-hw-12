// main.js
import {
    renderGallery,
    showLoader,
    hideLoader,
    handleError,
    showWarning
  } from './js/render-functions.js';
  
  import pixabayApi from './js/pixabay-api.js';
  
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const query = searchInput.value.trim();
    if (query === '') {
      showWarning('Please enter a search query!');
      return;
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
  