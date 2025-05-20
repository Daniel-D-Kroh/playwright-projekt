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
                    // ACHTUNG: Der sh-Befehl MUSS so aussehen, mit runden Klammern um die Parameter.
                    def playwrightResult = sh(
                        script: "npx playwright test",
                        returnStdout: true,
                        returnStatus: true
                    )

                    def match = playwrightResult.stdout =~ /.*\((\d+\.?\d*)s\)/
                    def totalTime = 'unbekannt'

                    if (match) {
                        totalTime = match[0][1]
                        echo "Playwright Gesamtlaufzeit: ${totalTime} Sekunden"
                    } else {
                        echo "FEHLER: Konnte Gesamtlaufzeit aus Playwright-Output nicht extrahieren."
                        echo "Vollständiger Playwright Output war:\n${playwrightResult.stdout}"
                    }

                    currentBuild.description = "Playwright Tests: ${totalTime}s"

                    // Fehlerbehandlung: Wenn der Testlauf selbst fehlschlägt
                    if (playwrightResult.status != 0) {
                        error "Playwright Tests sind mit Exit-Code ${playwrightResult.status} fehlgeschlagen."
                    }
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