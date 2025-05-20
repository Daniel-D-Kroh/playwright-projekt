pipeline {
    agent any

    environment {
        CYPRESS_PROJECT_PATH = 'cypress-projekt'  // Pfad zu deinem Cypress-Projekt
        PLAYWRIGHT_PROJECT_PATH = '/Users/dannydkroh/Documents/git/playwright-project' // Pfad zu deinem Playwright-Projekt
        RESULTS_DIR = 'test-results' // Gemeinsames Verzeichnis für Reports
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'YOUR_GIT_REPOSITORY_URL' // Ersetze mit deiner Repo-URL
            }
        }

        stage('Install Cypress Dependencies') {
            steps {
                dir("${CYPRESS_PROJECT_PATH}") {
                    sh 'npm install'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                dir("${CYPRESS_PROJECT_PATH}") {
                    sh "mkdir -p ../${RESULTS_DIR}/cypress" // Sicherstellen, dass das Verzeichnis existiert
                    // Den reporterOptions.mochaFile Pfad in cypress.config.js anpassen,
                    // damit die Reports direkt in das RESULTS_DIR landen, z.B. '../test-results/cypress/cypress-results-[hash].xml'
                    sh "npx cypress run --browser chrome --headless"
                }
            }
            post {
                always {
                    // Kopiere Reports, falls nicht direkt im RESULTS_DIR erstellt
                    sh "cp -R ${CYPRESS_PROJECT_PATH}/results/* ${RESULTS_DIR}/cypress/"
                }
            }
        }

        stage('Install Playwright Dependencies') {
            steps {
                dir("${PLAYWRIGHT_PROJECT_PATH}") {
                    sh 'npm install'
                    sh 'npx playwright install --with-deps' // Wichtig für CI-Umgebungen
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir("${PLAYWRIGHT_PROJECT_PATH}") {
                    sh "mkdir -p ../${RESULTS_DIR}/playwright" // Sicherstellen, dass das Verzeichnis existiert
                    // Den outputFile Pfad in playwright.config.js anpassen,
                    // damit die Reports direkt in das RESULTS_DIR landen, z.B. '../test-results/playwright/playwright-results.xml'
                    sh "npx playwright test"
                }
            }
            post {
                always {
                    // Kopiere Reports, falls nicht direkt im RESULTS_DIR erstellt
                    sh "cp -R ${PLAYWRXIGHT_PROJECT_PATH}/results/* ${RESULTS_DIR}/playwright/"
                }
            }
        }

        stage('Publish Test Results') {
            steps {
                junit "${RESULTS_DIR}/**/*.xml" // Sammelt alle JUnit XML-Reports
            }
        }

        // Optional: Performance Report (benötigt Performance Plugin)
        stage('Generate Performance Report') {
            steps {
                script {
                    // Hier müsstest du die Zeiten aus den JUnit Reports extrahieren
                    // oder wenn du spezifische Performance-Metriken hast, diese verarbeiten.
                    // Das Performance Plugin kann auch direkt JMeter/Gatling Reports verarbeiten.
                    // Für die reinen Laufzeiten der E2E-Tests, ist das JUnit Plugin oft ausreichend.
                    // Eine manuelle Extraktion und Darstellung in Jenkins-Plots wäre hier die Alternative.
                    echo "Manuelle Analyse der Laufzeiten aus JUnit-Reports oder Konsolenausgabe."
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: "${RESULTS_DIR}/**/*", fingerprint: true
            deleteDir() // Bereinigt den Workspace
        }
    }
}