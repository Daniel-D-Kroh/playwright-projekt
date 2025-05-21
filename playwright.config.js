const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    // Der Verzeichnispfad, in dem deine Testdateien liegen
    testDir: './e2e-tests',

    // Testet alle Dateien parallel
    fullyParallel: true,

    // Verbietet test.only in CI/CD-Umgebungen
    forbidOnly: !!process.env.CI,

    // Anzahl der Wiederholungen für fehlgeschlagene Tests
    // In CI: 2 Wiederholungen, sonst: 0 Wiederholungen
    retries: process.env.CI ? 2 : 0,

    // Anzahl der parallel laufenden Worker
    // In CI: 1 Worker, sonst: unbegrenzt (basierend auf CPU-Kernen)
    workers: process.env.CI ? 1 : 1,

    // Konfiguration der Reporter für Testergebnisse
    reporter: [
        ['list'], // Zeigt eine Liste der Tests im Terminal an
        ['junit', { outputFile: process.env.CI ? 'test-results/playwright/playwright-results.xml' : 'results/playwright-results.xml' }] // Generiert JUnit XML-Berichte
    ],

    // Allgemeine Einstellungen für alle Projekte
    use: {
        // Erstellt einen Trace bei fehlgeschlagenen Tests zur besseren Fehlersuche
        trace: 'on-first-retry',
    },

    // Definition der Testprojekte (z.B. für verschiedene Browser)
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // Du könntest hier weitere Browser hinzufügen, z.B. für Firefox oder WebKit
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],

});