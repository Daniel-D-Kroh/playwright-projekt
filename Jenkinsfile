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
                    // WICHTIGE ÄNDERUNG HIER: Übergabe der Parameter als Map
                    def playwrightResult = sh(
                        script: "npx playwright test",
                        returnStdout: true,
                        returnStatus: true // Brauchen wir immer noch, um den Exit-Code zu bekommen
                    )

                    // Jetzt greifen wir auf playwrightResult.stdout zu
                    def match = playwrightResult.stdout =~ /.*\((\d+\.?\d*)s\)/
                    def totalTime = 'unbekannt'

                    if (match) {
                        totalTime = match[0][1]
                        echo "Playwright Gesamtlaufzeit: ${totalTime} Sekunden"
                    } else {
                        echo "FEHLER: Konnte Gesamtlaufzeit aus Playwright-Output nicht extrahieren."
                        // Optional: Den vollständigen Output ausgeben zur Fehlersuche
                        // echo "Playwright Output war:\n${playwrightResult.stdout}"
                    }

                    currentBuild.description = "Playwright Tests: ${totalTime}s"

                    // Wichtig: Wenn der Testlauf selbst fehlschlägt (z.B. weil Playwright nicht 0 zurückgibt)
                    // und du willst, dass der Jenkins-Build fehlschlägt, dann:
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