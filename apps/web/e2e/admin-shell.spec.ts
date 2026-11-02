import { expect, test } from '@playwright/test';

test('renders the admin shell with planned sections disabled', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Overview' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Admin sections' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Overview' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('link', { name: 'Audit Logs' })).toHaveCount(0);
});

test('health endpoint answers with the API envelope', async ({ request }) => {
  const response = await request.get('/api/health');
  // Without a database in this test run the honest answer is 503, and both follow the contract.
  expect([200, 503]).toContain(response.status());
  expect(await response.json()).toHaveProperty('success', response.status() === 200);
});
