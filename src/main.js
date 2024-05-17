import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPhotoByQuery } from './js/pixabay-api.js';
import { createImageGalleryItem } from './js/render-functions.js';

import { PER_PAGE } from './js/pixabay-api.js';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.js-search-form');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.btn-load-more');

let searchQuery = null;
let newsCurrentPage = 1;
let totalPages = 0;

async function onSearchFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  searchQuery = form.elements.searchKeyword.value.trim();
  galleryEl.innerHTML = '';

  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
    return;
  }

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  try {
    const { data } = await fetchPhotoByQuery(searchQuery, newsCurrentPage);

    if (data.total === 0) {
      iziToast.show({
        message: 'Search params is not valid',
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });

      loaderEl.classList.add('is-hidden');
      event.target.reset();
      return;
    }

    const simpleLighbox = new SimpleLightbox('.gallery-list a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

    galleryEl.innerHTML = createImageGalleryItem(data.hits);

    simpleLighbox.refresh();

    totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (totalPages > 1) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    let message = '';
    if (error.message === 'rateLimited') {
      message = 'Too many requests';
    } else {
      message += 'Sorry, there are no images for this query';
    }

    iziToast.error({
      message,
      position: 'topRight',
      timeout: 2000,
    });
  }

  event.target.reset();
  loaderEl.classList.add('is-hidden');
}

const smoothScrollOnLoadMore = () => {
  const lastDiv = galleryEl.querySelector('.gallery-item');
  const newsDivesHeight = lastDiv.getBoundingClientRect().height;
  const scrollHeight = newsDivesHeight * 2;

  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};

const onLoadMorePressed = async event => {
  try {
    newsCurrentPage += 1;

    const { data } = await fetchPhotoByQuery(searchQuery, newsCurrentPage);

    const simpleLighbox = new SimpleLightbox('.gallery-list a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

    galleryEl.insertAdjacentHTML(
      'beforeend',
      createImageGalleryItem(data.hits)
    );
    simpleLighbox.refresh();
    smoothScrollOnLoadMore();

    if (newsCurrentPage > totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', onLoadMorePressed);
      iziToast.error({
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
        timeout: 2000,
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Search params is not valid',
      position: 'topRight',
      timeout: 2000,
    });
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMorePressed);
