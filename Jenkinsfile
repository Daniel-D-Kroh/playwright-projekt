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
                sh "npx playwright test" // Ausführung der Playwright Tests
            }
        }

        stage('Publish Test Results & Performance') {
            steps {
                junit "${RESULTS_DIR}/**/*.xml" // Veröffentlicht die JUnit-Testergebnisse

                // Füge diese Zeile für das Performance Plugin hinzu:
                // Es verwendet die gleichen JUnit XML-Dateien wie das JUnit-Plugin
                // Der Type ist 'JUnit' und die Report Files sind die XMLs, die du bereits erzeugst
                performance ReportFiles: "${RESULTS_DIR}/**/*.xml", ReportType: 'JUnit'
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