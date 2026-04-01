import axios from 'axios';

// In production (Vercel), set VITE_API_BASE_URL to your Render backend URL.
// In local dev, it falls back to localhost automatically.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 
Regular CRUD API endpoints.

- getAllListings: () => api.get('/listings/') - Get all listings
- getListing: (id) => api.get(`/listings/${id}/`) - Get a specific listing by ID
- createListing: (data) => api.post('/listings/', data) - Create a new listing
- updateListing: (id, data) => api.put(`/listings/${id}/`, data) - Update a specific listing by ID
- deleteListing: (id) => api.delete(`/listings/${id}/`) - Delete a specific listing by ID
- searchListings: (city) => api.get(`/listings/search/?city=${encodeURIComponent(city)}`) - Search listings by city
*/

export const listingsAPI = {
  getAllListings: () => api.get('/listings/'),
  getListing: (id) => api.get(`/listings/${id}/`),
  createListing: (data) => api.post('/listings/', data),
  updateListing: (id, data) => api.put(`/listings/${id}/`, data),
  deleteListing: (id) => api.delete(`/listings/${id}/`),
  searchListings: (city) => api.get(`/listings/search/?city=${encodeURIComponent(city)}`),
};

/* 
Custom API endpoints.

- getCitySuggestions: (query) => api.get(`/listings/search/?city=${encodeURIComponent(query)}`) - Get city suggestions for autocomplete
- geminiChat: (message) => api.post('/listings/chat/', { message }) - Send a message to Gemini AI chatbot
*/

export const getCitySuggestions = async (query) => {
  const listings = await listingsAPI.getAllListings().then(res => res.data);
  const cities = Array.from(new Set(
    listings
      .map(l => l.city)
      .filter(city => city && city.toLowerCase().includes(query.toLowerCase()))
  ));
  return cities;
};

// Gemini AI Chat — calls POST /api/listings/chat/
export const geminiChat = (message) => api.post('/listings/chat/', { message });

export default api;