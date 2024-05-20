import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchPhotos } from './js/pixabay-api';
import { createGallery } from './js/render-functions';

const formEl = document.querySelector('.form');
const galleryList = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let searchQuery = '';
let totalHits = 0;

formEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.search.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      message: 'Search query cannot be empty. Please try again!',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 4000,
    });
    return;
  }

  page = 1;
  loaderEl.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');
  galleryList.innerHTML = '';

  try {
    const { data } = await searchPhotos(searchQuery, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 4000,
      });
      loaderEl.classList.add('is-hidden');
      return;
    }

    galleryList.innerHTML = createGallery(data.hits);
    lightbox.refresh();

    if (data.hits.length < 15 || totalHits <= 15) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        backgroundColor: '#9fc5e8',
        position: 'topRight',
        timeout: 4000,
      });
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 4000,
    });
  } finally {
    loaderEl.classList.add('is-hidden');
    event.target.reset();
  }
}

async function onLoadMore() {
  page += 1;
  loaderEl.classList.remove('is-hidden');

  try {
    const { data } = await searchPhotos(searchQuery, page);
    galleryList.insertAdjacentHTML('beforeend', createGallery(data.hits));
    lightbox.refresh();

    const cardHeight =
      galleryList.firstElementChild.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (data.hits.length < 15 || page * 15 >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        backgroundColor: '#9fc5e8',
        position: 'topRight',
        timeout: 4000,
      });
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 4000,
    });
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}
