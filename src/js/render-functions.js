import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const galleryElement = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

export function renderImages(images) {
  const markup = images.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="photo-card">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${likes}</p>
          <p class="info-item"><b>Views</b> ${views}</p>
          <p class="info-item"><b>Comments</b> ${comments}</p>
          <p class="info-item"><b>Downloads</b> ${downloads}</p>
        </div>
      </div>
    `
  ).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function clearImages() {
  galleryElement.innerHTML = '';
}

export function showNoResultsMessage() {
  iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    theme: 'dark',
    position: 'topRight',
    backgroundColor: '#EF4040'
  });
}

export function showLoadingSpinner() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoadingSpinner() {
  document.querySelector('.loader').classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    theme: 'dark',
    position: 'topRight',
    backgroundColor: '#2196F3'
  });
}

export function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
