const { test, expect } = require('@playwright/test');

// Test Suite: Beschreibt eine Gruppe von Tests
test.describe('Example Website Tests', () => {

    // Vor jedem Test in dieser Suite wird diese Funktion ausgeführt.
    // Ideal, um eine Seite zu besuchen oder Login-Schritte auszuführen.
    test.beforeEach(async ({ page }) => {
        // Navigiert zur Beispielseite
        await page.goto('https://www.example.com');
    });

    // Einzelner Testfall: Besucht die Seite und überprüft den Titel
    test('should have the correct title', async ({ page }) => {
        // Erwartet, dass der Titel der Seite "Example Domain" ist
        await expect(page).toHaveTitle(/Example Domain/);
    });

    // Einzelner Testfall: Überprüft den Hauptüberschriftstext
    test('should display the main heading text', async ({ page }) => {
        // Sucht das H1-Element und erwartet, dass es den Text "Example Domain" enthält
        const heading = page.locator('h1');
        await expect(heading).toHaveText('Example Domain');
    });

    test('should show correct paragraph text', async ({ page }) => {
        // Sucht den ersten Absatz (<p>-Tag)
        const paragraph = page.locator('p').first();
        // Erwartet, dass der Absatz einen Teil des erwarteten Textes enthält
        await expect(paragraph).toContainText('This domain is for use in illustrative examples');
    });


});