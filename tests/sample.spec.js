import { test, expect } from '@playwright/test';

test('Intentional Failure', async () => {
  expect(1).toBe(2);
});