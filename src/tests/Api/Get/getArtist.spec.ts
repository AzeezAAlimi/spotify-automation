import { test, expect, request } from '@playwright/test';
import { getAccessToken } from '../../../utilities/getAccessToken';

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

  test('Fetch album - Assert response status', async ({ request }) => {
    const accessToken = await getAccessToken(request);
    const response = await request.get(
      `${baseUrl}/albums/4VMedo8R4GGqMXqv94Jtwq`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    expect(response.status()).toBe(200);
    console.log(await response.json());

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('Trouble (20th Anniversary Edition)');
    expect(responseBody.artists[0].name).toBe('Akon');
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
