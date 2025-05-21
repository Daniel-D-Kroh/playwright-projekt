const { test, expect } = require('@playwright/test');

// Test Suite: Beschreibt eine Gruppe von Tests
test.describe('Example Website Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigiert zur Beispielseite
        await page.goto('https://www.example.com');
    });

    test('should have the correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Example Domain/);
    });

});