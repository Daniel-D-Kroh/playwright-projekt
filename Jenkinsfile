pipeline {
    agent any

    environment {
        PLAYWRIGHT_PROJECT_PATH = '.'
        RESULTS_DIR = 'test-results'
        PLAYWRIGHT_REPORT_FILE = "${RESULTS_DIR}/playwright/playwright-results.xml"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Daniel-D-Kroh/playwright-projekt.git'
            }
        }

        stage('Install Playwright Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh "mkdir -p ${RESULTS_DIR}/playwright"
                sh "npx playwright test"
            }
        }

        stage('Publish Test Results') {
            steps {
                junit "${RESULTS_DIR}/**/*.xml"
            }
        }

        stage('Measure Performance') {
            steps {
                script {
                    // Befehl, um die Gesamtzeit aus dem <testsuite>-Tag zu extrahieren
                    def totalTime = sh(
                        script: "grep -oP '<testsuite[^>]*time=\"\\K[0-9.]+' ${PLAYWRIGHT_REPORT_FILE} | head -1",
                        returnStdout: true
                    ).trim()

                    if (totalTime) {
                        echo "Playwright Gesamtlaufzeit: ${totalTime} Sekunden"
                        currentBuild.description = "Playwright Tests: ${totalTime}s"
                    } else {
                        echo "FEHLER: Konnte Gesamtlaufzeit aus ${PLAYWRIGHT_REPORT_FILE} nicht extrahieren."
                        currentBuild.description = "Playwright Tests: Laufzeit unbekannt"
                    }
                }
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