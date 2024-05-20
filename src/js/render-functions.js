export function createGallery(images) {
  return images
    .map(
      ({ tags, likes, views, comments, downloads, largeImageURL }) =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-img" src="${largeImageURL}" alt="${tags}">
            <div class="info-gallery-box">
              <ul class="info-gallery-list">
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Likes</p>
                  <span class="info-gallery-span">${likes}</span>
                </li>
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Views</p>
                  <span class="info-gallery-span">${views}</span>
                </li>
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Comments</p>
                  <span class="info-gallery-span">${comments}</span>
                </li>
                <li class="info-gallery-item">
                  <p class="info-gallery-text">Downloads</p>
                  <span class="info-gallery-span">${downloads}</span>
                </li>
              </ul>
            </div>
          </a>
        </li>`
    )
    .join('');
}
