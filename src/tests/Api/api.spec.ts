import { test, expect, request } from '@playwright/test';
import { getAccessToken } from '../../utilities/getAccessToken';

test.describe.parallel('Spotify API Testing', () => {
  const baseUrl = 'https://api.spotify.com/v1';

  test('Fetch artist - Assert response status', async ({ request }) => {
    const accessToken = await getAccessToken(request);
    const response = await request.get(`${baseUrl}/artists/6vWDO969PvNqNYHIOW5v0m`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(response.status()).toBe(200);
    console.log(await response.json());

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('Beyoncé');
    expect(responseBody.type).toContain('artist');
  });

  test('Fetch multiple artists - Assert response status', async ({ request }) => {
    const accessToken = await getAccessToken(request);
    const response = await request.get(
      `${baseUrl}/artists?ids=4yiQZ8tQPux8cPriYMWUFP,1ZwdS5xdxEREPySFridCfh,0z4gvV4rjIZ9wHck67ucSV`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    expect(response.status()).toBe(200);
    console.log(await response.json());

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('Akon');
    expect(responseBody.name).toBe('2Pac');
    expect(responseBody.name).toBe('Gwen Stefani');
  });

  test('Fetch artist details - Assert invalid endpoint', async ({ request }) => {
    const accessToken = await getAccessToken(request);
    const response = await request.get(`${baseUrl}/artists/abcdefghijk`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    expect(response.status()).toBe(400);
    console.log(await response.json());
  });
});
