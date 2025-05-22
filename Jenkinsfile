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

        stage('Execute Playwright Tests') { //
            steps {
                script {

                    stage('Playwright - Prepare Reports') {
                        sh "mkdir -p ${RESULTS_DIR}/playwright"
                    }

                    stage('Playwright - Run Test 1') {
                        sh "npx playwright test --project=chromium example.spec.js"
                    }

                    stage('Playwright - Run Test 2') {
                        sh "npx playwright test --project=chromium example.spec.js"
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