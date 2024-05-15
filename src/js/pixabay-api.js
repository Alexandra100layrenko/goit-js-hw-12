// pixabay-api.js
import axios from 'axios';

const API_KEY = '42772780-849d5e67a8b9b0ab7e6b7483b';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

export default {
  async fetchImages(query) {
    try {
      const response = await fetch(`${BASE_URL}&q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      return data.hits;
    } catch (error) {
      console.error('Error fetching images:', error);
      handleError(error);
      throw error;
    }
  },
};
