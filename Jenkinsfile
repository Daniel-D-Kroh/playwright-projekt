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

        stage('Run Playwright Tests') {
                        steps {
                            sh "mkdir -p ${RESULTS_DIR}/playwright"
                            // Fange die gesamte Konsolenausgabe ab
                            script {
                                def output = sh(script: "npx playwright test", returnStdout: true, returnStatus: true)

                                // Hier kannst du die Ausgabe nach der Zeit filtern
                                // (Beispiel: "3 passed (1.7s)")
                                def match = output.stdout =~ /.*?\((\d+\.?\d*)s\)/
                                if (match) {
                                    def totalTime = match[0][1]
                                    echo "Playwright Gesamtlaufzeit: ${totalTime} Sekunden"
                                    currentBuild.description = "Playwright Tests: ${totalTime}s"
                                } else {
                                    echo "Konnte Laufzeit aus Konsolenausgabe nicht extrahieren."
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