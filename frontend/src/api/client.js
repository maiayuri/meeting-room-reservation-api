const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.message || 'Erro na requisição.');
    error.status = response.status;
    throw error;
  }

  return data;
}
