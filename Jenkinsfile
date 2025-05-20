pipeline {
    agent any

    environment {
        PLAYWRIGHT_PROJECT_PATH = '.'
        RESULTS_DIR = 'test-results'
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
                script {
                    // Führe den Test aus und fange die gesamte Konsolenausgabe ab
                    def playwrightOutput = sh(
                        script: "npx playwright test",
                        returnStdout: true,
                        returnStatus: true // Stellt sicher, dass der Build nicht fehlschlägt, wenn Tests fehlschlagen, aber die Ausgabe trotzdem da ist
                    )

                    // Suche nach dem Muster "X passed (Y.Zs)" in der Ausgabe
                    def match = playwrightOutput.stdout =~ /.*\((\d+\.?\d*)s\)/
                    def totalTime = 'unbekannt' // Standardwert für den Fall, dass die Zeit nicht gefunden wird

                    if (match) {
                        totalTime = match[0][1]
                        echo "Playwright Gesamtlaufzeit: ${totalTime} Sekunden"
                    } else {
                        echo "FEHLER: Konnte Gesamtlaufzeit aus Playwright-Output nicht extrahieren."
                    }

                    // Setze die Build-Beschreibung mit der gefundenen Zeit
                    currentBuild.description = "Playwright Tests: ${totalTime}s"
                }
            }
        }

        stage('Publish Test Results') {
            steps {
                junit "${RESULTS_DIR}/**/*.xml"
            }
        }

        stage('Generate Performance Report') {
            steps {
                script {
                    echo "Manuelle Analyse der Laufzeiten aus JUnit-Reports oder Konsolenausgabe."
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