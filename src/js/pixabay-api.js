import axios from 'axios';

const API_KEY = '42772780-849d5e67a8b9b0ab7e6b7483b';
const BASE_URL = 'https://pixabay.com/api/';

export default {
  async fetchImages(query, page = 1, perPage = 15) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page,
          per_page: perPage,
        },
      });

      if (response.data.hits.length === 0) {
        throw new Error('No images found');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  },
}