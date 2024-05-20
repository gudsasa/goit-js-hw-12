import axios from 'axios';

const API_KEY = '43838996-7b0b384f174ce1ebbbcd3455e';
const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;

export async function searchPhotos(query, page) {
  try {
    const response = await axios.get('', {
      params: {
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: API_KEY,
        per_page: 15,
        page,
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching data from Pixabay API:', error);
    throw error;
  }
}
