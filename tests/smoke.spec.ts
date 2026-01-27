import { test, expect } from '@playwright/test';

test.describe('PACTO App Smoke Test', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('http://localhost:3000');
    });

    test('User can navigate from Landing to Login', async ({ page }) => {
        // Landing Page Verification
        await expect(page.getByText('PACTO', { exact: true }).first()).toBeVisible();

        // Find "Comenzar" button
        const startButton = page.getByRole('button', { name: /comenzar/i }).first();
        await expect(startButton).toBeVisible();
        await startButton.click();

        // Verify we are at Login
        await expect(page.getByText('Bienvenido de nuevo')).toBeVisible();
        await expect(page.getByPlaceholder('nombre@empresa.com')).toBeVisible();
    });

    test('User can login and see Dashboard', async ({ page }) => {
        // Navigate to login
        await page.getByRole('button', { name: /comenzar/i }).first().click();

        // Fill Login Form
        await page.getByPlaceholder('nombre@empresa.com').fill('demo@pacto.com'); // Mock credentials
        await page.getByPlaceholder('••••••••').fill('password123'); // Mock credentials

        // Click Login
        await page.getByRole('button', { name: /iniciar sesión/i }).click();

        // Verify Dashboard Access (The mocked auth service should let us in)
        // Wait for specific Dashboard element
        await expect(page.getByText('Mis Acuerdos')).toBeVisible();
    });

    test('User can create a new Agreement', async ({ page }) => {
        // 1. Login first
        await page.getByRole('button', { name: /comenzar/i }).first().click();
        await page.getByPlaceholder('nombre@empresa.com').fill('demo@pacto.com');
        await page.getByPlaceholder('••••••••').fill('password123');
        await page.getByRole('button', { name: /iniciar sesión/i }).click();

        // 2. Go to Agreements
        await expect(page.getByText('Mis Acuerdos')).toBeVisible();
        // Since we are likely on Dashboard, "Mis Acuerdos" might be a section or button.
        // Let's assume we are on Dashboard and see the list.

        // Find "Crear Nuevo" button
        const createBtn = page.getByRole('button', { name: /crear nuevo/i }).first();
        if (await createBtn.isVisible()) {
            await createBtn.click();
        } else {
            // Try sidebar or main action
            await page.getByText('Nuevo Acuerdo').click();
        }

        // 3. Fill Agreement Form
        await page.getByLabel('Nombre del Acuerdo').fill('Test Automatizado Playwright');
        await page.getByLabel('Propósito').fill('Verificar que funciona el test e2e.');

        // 4. Submit
        await page.getByRole('button', { name: /publicar acuerdo/i }).click();

        // 5. Verify it appears in the list
        await expect(page.getByText('Test Automatizado Playwright')).toBeVisible();
    });
});
