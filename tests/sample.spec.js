import { test, expect } from '@playwright/test';

test('Intentional Failure', async () => {
  expect(5).toBe(2);
});