const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests', // Dein Testordner
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['junit', { outputFile: 'results/playwright-results.xml' }]], // List für Konsole, JUnit für Report
    use: {
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});