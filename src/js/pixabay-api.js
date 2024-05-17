import axios from 'axios';
export const PER_PAGE = 15;

axios.defaults.baseURL = 'https://pixabay.com';

const options = {
  key: '43802528-015b222178f5679b6792a0cf2',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const fetchPhotoByQuery = async (q = '', newsPage = 1) => {
  const searchParams = {
    key: options.key,
    per_page: PER_PAGE,
    q,
    orientation: options.orientation,
    image_type: options.image_type,
    safesearch: options.safesearch,
    page: newsPage,
  };

  return await axios.get('/api/', {
    params: {
      ...searchParams,
    },
  });
};
