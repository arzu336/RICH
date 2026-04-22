pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/rojdaayldz/RICH'
            }
        }

        stage('Build Backend') {
            steps {
                dir('RichBackend') {
                    sh 'docker build -t rich-backend .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('web-frontend') {
                    sh 'docker build -t rich-frontend .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker rm -f backend || true'
                sh 'docker rm -f frontend || true'
                sh 'docker run -d -p 8080:8080 --name backend rich-backend'
                sh 'docker run -d -p 5173:5173 --name frontend rich-frontend'
            }
        }
    }
}
