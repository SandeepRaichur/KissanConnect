// Centralized API configuration for local development and live production
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/+$/, '');
  }
  // When deployed to production, default to same-origin relative URLs (/api)
  if (import.meta.env.PROD) {
    return '';
  }
  // In local development, fall back to localhost:5000 if not proxying
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Builds a full API URL given a path
 * @param {string} endpoint - e.g. '/api/products' or 'api/products'
 * @returns {string} - Full API URL
 */
export const apiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default apiUrl;
