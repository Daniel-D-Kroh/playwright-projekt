const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e-tests', // Dein Testordner
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['junit', { outputFile: process.env.CI ? '../test-results/playwright/playwright-results.xml' : 'results/playwright-results.xml' }]],
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