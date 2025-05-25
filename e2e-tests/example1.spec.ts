import {test, expect} from '@playwright/test';
import {createAliasAsString} from "../fixures/basefunctions";


test.describe('Volksbank User Website Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.vb-muensterland.de/privatkunden.html');
        await page.getByRole('button', { name: 'Allen zustimmen' }).click();
        await page.getByTestId('lightbox lightbox--cookie-consent cheering').first().waitFor({ state: 'detached' });
    });

    test('Sollte einen neuen Bankkunden erfolgreich registrieren', async ({ page }) => {
        // Schritt 1: Navigieren zum Kontoeröffnungsformular
        await test.step('Schritt 1: Navigation zur Kontoeröffnung', async () => {
            await page.getByRole('link', { name: 'Konto & Karten' }).click();
            await page.getByRole('link', { name: 'Übersicht Kontomodelle' }).click();
            await page.getByRole('link', { name: 'Jetzt Konto eröffnen' }).first().click();
            await page.getByTitle('Mein Münsterland-Konto mit').click();
            await page.getByRole('button', { name: 'Weiter' }).click();
        });


        // Schritt 2: Persönliche Daten eingeben
        await test.step('Schritt 2: Persönliche Daten eingeben', async () => {
            await expect(page.locator('produktverkauf-top-bar')).toContainText('Personendaten');
            await page.getByRole('button', { name: 'Anrede Auswahl schliessen' }).click();
            await page.getByRole('option', { name: 'Herr' }).click();
            await page.getByRole('textbox', { name: 'Vorname(n) gemäß Ausweis' }).fill('John');
            await page.getByRole('textbox', { name: 'Nachname' }).fill('Doe');
            await page.getByRole('textbox', { name: 'Geburtsname (optional)' }).fill('1');
            await page.getByRole('textbox', { name: 'Geburtsdatum' }).fill('01.01.1990');
            await page.getByRole('textbox', { name: 'Geburtsort' }).fill('Musterstadt');
            await page.getByRole('combobox', { name: 'Geburtsland' }).click();
            await page.getByText('Deutschland').click();
            await page.getByRole('combobox', { name: 'Staatsangehörigkeit (Land)' }).click();
            await page.locator('div').filter({ hasText: /^Deutschland$/ }).first().click();
            await page.getByText('Familienstand (optional)').click();
            await page.locator('div').filter({ hasText: /^getrennt lebend$/ }).click();
            await page.getByRole('button', { name: 'Weiter' }).click();
        });

        // Schritt 3: Kontakt- und Adressdaten eingeben
        await test.step('Schritt 3: Kontakt- und Adressdaten eingeben', async () => {
            await page.getByRole('textbox', { name: 'Straße' }).fill('Münzstr.');
            await page.getByRole('textbox', { name: 'Haus-Nr.' }).fill('123');
            await page.getByRole('textbox', { name: 'PLZ' }).fill('48143');
            await page.getByRole('textbox', { name: 'Ort' }).fill('Münster');
            await page.getByRole('textbox', { name: 'E-Mail-Adresse', exact: true }).fill('john.doe@example.org');
            await page.getByRole('textbox', { name: 'E-Mail-Adresse wiederholen' }).fill('john.doe@example.org');
            await page.getByRole('textbox', { name: 'Mobil-Nr.' }).fill('176123123123');
            await page.getByRole('button', { name: 'Weiter', exact: true }).click();
        });

        // Schritt 4: Steuerliche Informationen und Beruf eingeben
        await test.step('Schritt 4: Steuerliche Informationen & Beruf eingeben', async () => {
            await expect(page.locator('produktverkauf-top-bar')).toContainText('Mehr Informationen');
            await page.getByRole('radio', { name: 'Nein' }).check();
            await page.getByRole('button', { name: 'Land auswählen Auswahl öffnen' }).click();
            await page.locator('div').filter({ hasText: /^Deutschland$/ }).click();
            await page.getByRole('checkbox', { name: 'Ich habe die Steuer-' }).check();
            await page.getByRole('button', { name: 'Weiter', exact: true }).click();
            await page.locator('div').filter({ hasText: /^Angestellte\(r\)$/ }).click();
            await page.getByRole('button', { name: 'Weiter', exact: true }).click();
        });

        // Schritt 5: Online-Banking-Zugang einrichten
        await test.step('Schritt 5: Online-Banking-Zugang einrichten', async () => {
            let alias = createAliasAsString();
            await page.getByRole('textbox', { name: 'Alias' }).fill(alias);
            await page.getByRole('textbox', { name: 'PIN', exact: true }).fill('Test12345');
            await page.getByRole('textbox', { name: 'PIN wiederholen' }).fill('Test12345');
            await page.getByRole('button', { name: 'Weiter' }).click();
        });

        // Schritt 6: Marketing-Präferenzen und Zustimmungen
        await test.step('Schritt 6: Marketing-Präferenzen & Zustimmungen', async () => {
            await page.getByRole('radio', { name: 'Ich möchte keine Information' }).check();
            await page.getByRole('radio', { name: 'Ich möchte per E-Mail an john' }).check();
            await page.getByRole('checkbox', { name: 'Ich willige ein.' }).check();
            await page.getByRole('button', { name: 'Weiter', exact: true }).click();
        });

        // Schritt 7: Zusammenfassung und Bestätigung
        await test.step('Schritt 7: Zusammenfassung & Beauftragung', async () => {
            await page.getByRole('checkbox', { name: 'Ich versichere als' }).check();
            await page.getByRole('button', { name: 'Weiter' }).click();
            await page.locator('mat-progress-spinner').first().waitFor({ state: 'detached' });
            const headingElement = page.locator('#ausleitung-ueberschrift')
            expect(headingElement.isVisible());
            await expect(headingElement.locator('h2')).toHaveText('Vielen Dank für Ihr Interesse!');
        });
    });
});