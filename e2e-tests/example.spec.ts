import {test, expect} from '@playwright/test';

// Test Suite: Beschreibt eine Gruppe von Tests
test.describe('Example Website Tests', () => {

    // Vor jedem Test in dieser Suite wird diese Funktion ausgeführt.
    // Ideal, um eine Seite zu besuchen oder Login-Schritte auszuführen.
    test.beforeEach(async ({ page }) => {
        // Navigiert zur Beispielseite
        await page.goto('https://www.example.com');
    });

    test('should have the correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Example Domain/);
    });

    test('should display the main heading text', async ({ page }) => {
        const heading = page.locator('h1');
        await expect(heading).toHaveText('Example Domain');
    });

    test('should show correct paragraph text', async ({ page }) => {
        const paragraph = page.locator('p').first();
        await expect(paragraph).toContainText('This domain is for use in illustrative examples');
    });

    // --- Zusätzliche Prüfungen ---

    test('should have a link to IANA and it should be visible', async ({ page }) => {
        const ianaLink = page.locator('a[href="https://www.iana.org/domains/example"]');
        await expect(ianaLink).toBeVisible();
        await expect(ianaLink).toHaveText('More information...');
    });

    test('should contain specific text within the body', async ({ page }) => {
        // Überprüft, ob der Body der Seite einen bestimmten Text enthält
        await expect(page.locator('body')).toContainText('You may use this domain in literature without prior coordination or asking for permission.');
    });

    test('should have exactly two paragraphs', async ({ page }) => {
        // Zählt die Anzahl der <p>-Elemente auf der Seite
        const paragraphs = page.locator('p');
        await expect(paragraphs).toHaveCount(2);
    });

    test('should have the correct character encoding meta tag', async ({ page }) => {
        // Prüft, ob das Meta-Tag für die Zeichenkodierung korrekt ist
        const metaCharset = page.locator('meta[charset]');
        await expect(metaCharset).toHaveAttribute('charset', 'utf-8');
    });

    test('should have a viewport meta tag', async ({ page }) => {
        // Prüft, ob ein Viewport-Meta-Tag vorhanden ist (wichtig für Responsiveness)
        const metaViewport = page.locator('meta[name="viewport"]');
        await expect(metaViewport).toBeHidden();
    });

});