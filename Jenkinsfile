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
                sh "npx playwright test" // Dies führt die Tests aus und generiert die JUnit XML-Datei
            }
        }

        stage('Publish Test Results & Performance') {
            steps {
                junit "${RESULTS_DIR}/**/*.xml" // Veröffentlicht die JUnit-Testergebnisse in Jenkins' Test-Report

                // DIES IST DER SCHRITT FÜR DIE PERFORMANCE MESSUNG
                // Er liest direkt die JUnit XML-Dateien, die bereits existieren
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