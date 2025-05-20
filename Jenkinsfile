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
                // Füge diese Zeile hinzu, um den PATH zu überprüfen
                sh 'echo "PATH is: $PATH"'
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