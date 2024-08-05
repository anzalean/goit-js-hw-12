import { fetchImages } from './js/pixabay-api';
import { renderImages, clearImages, showNoResultsMessage, showLoadingSpinner, hideLoadingSpinner, showLoadMoreButton, hideLoadMoreButton, showEndOfResultsMessage, smoothScroll } from './js/render-functions';
import iziToast from 'izitoast';

const PER_PAGE = 15;
let query = '';
let page = 1;
let totalHits = 0;

document.querySelector('#search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  query = event.target.elements.searchQuery.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      theme: 'dark',
      position: 'topRight',
      backgroundColor: '#FFA000'
    });
    return;
  }

  page = 1;
  clearImages();
  hideLoadMoreButton();
  showLoadingSpinner();

  try {
    const data = await fetchImages(query, page);
    hideLoadingSpinner();
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showNoResultsMessage();
    } else {
      renderImages(data.hits);
      if (totalHits > PER_PAGE) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    hideLoadingSpinner();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      theme: 'dark',
      position: 'topRight',
      backgroundColor: '#EF4040'
    });
  }
});

document.querySelector('.load-more').addEventListener('click', async () => {
  page += 1;
  showLoadingSpinner();

  try {
    const data = await fetchImages(query, page);
    hideLoadingSpinner();
    renderImages(data.hits);
    smoothScroll();
    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    }
  } catch (error) {
    hideLoadingSpinner();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      theme: 'dark',
      position: 'topRight',
      backgroundColor: '#EF4040'
    });
  }
});
