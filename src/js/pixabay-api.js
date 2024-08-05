import axios from 'axios';

const API_KEY = '45205333-a930dfeeeabac87545cb9c1b9';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
