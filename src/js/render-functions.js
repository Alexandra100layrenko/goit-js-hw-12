import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function renderGallery(images) {
  const galleryList = document.querySelector('.gallery');
  const loadMoreBtn = document.querySelector('.load-more-btn');

  if (!galleryList || !loadMoreBtn) {
    console.error('Gallery list or Load more button not found');
    return;
  }

  const galleryItems = images.map(image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
      </a>
      <div class="gallery-item-info">
        <div class="info-item">Likes: ${image.likes}</div>
        <div class="info-item">Views: ${image.views}</div>
        <div class="info-item">Comments: ${image.comments}</div>
        <div class="info-item">Downloads: ${image.downloads}</div>
      </div>
    </li>
  `).join('');

  galleryList.innerHTML += galleryItems;

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();

  if (images.length > 0) {
    loadMoreBtn.classList.remove('hidden');
  }
}

function clearGallery() {
  const galleryList = document.querySelector('.gallery');
  if (galleryList) {
    galleryList.innerHTML = '';
  } else {
    console.error('Gallery list not found');
  }
}

function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('visible');
  } else {
    console.error('Loader not found');
  }
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('visible');
  } else {
    console.error('Loader not found');
  }
}

function handleError(error) {
  console.error('Error:', error);
  showErrorMessage('An error occurred. Please try again later.');
}

function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

function showWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message: message,
  });
}

function showEndMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

export {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  handleError,
  showWarning,
  showEndMessage
};
