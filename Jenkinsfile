pipeline {
    agent any
    stages {
        stage('Install dependencies') {
            steps {
                dir('/var/lib/jenkins/workspace/PI-DEV-V0_Project-Management/frontend'){
                script {
                    sh 'npm install --force'
                }
                }
            }
        }
        stage('Unit Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }
        stage('Build application') {
            steps {
                script {
                    sh 'npm run build-dev'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'scanner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }
}
