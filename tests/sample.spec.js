import { test, expect } from '@playwright/test';

test('Intentional Failure', async () => {
  expect(10).toBe(10);
})