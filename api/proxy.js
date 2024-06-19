import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { method, headers, body } = req;
  const path = req.url.replace('/api/proxy/', '');

  const response = await fetch(`https://tiplink.io/${path}`, {
    method,
    headers: {
      ...headers,
      host: 'tiplink.io',
    },
    body: method !== 'GET' ? JSON.stringify(body) : null,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
