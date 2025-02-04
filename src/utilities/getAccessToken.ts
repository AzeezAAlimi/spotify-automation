import { test, expect } from '@playwright/test';

async function getAccessToken(request: any): Promise<string> {
    const CLIENT_ID = 'xxxx';
    const CLIENT_SECRET = 'xxxxx';

  const response = await request.post('https://accounts.spotify.com/api/token', {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: { grant_type: 'client_credentials' },
  });

  expect(response.status()).toBe(200);
  const { access_token } = await response.json();
  return access_token;
}

export { getAccessToken };
