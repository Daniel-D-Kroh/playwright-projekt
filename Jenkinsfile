pipeline {
    agent any

    environment {
        PLAYWRIGHT_PROJECT_PATH = '.' // Aktuelle Verzeichnis
        RESULTS_DIR = 'test-results' // Verzeichnis für Reports
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Daniel-D-Kroh/playwright-projekt.git' // Repo-URL
            }
        }

        stage('Install Playwright Dependencies') {
            steps {
                dir("${PLAYWRIGHT_PROJECT_PATH}") {
                    sh 'npm install'
                    sh 'npx playwright install --with-deps'
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
                junit "${RESULTS_DIR}/**/*.xml"
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: "${RESULTS_DIR}/**/*", fingerprint: true
            deleteDir()
        }
    }
}