pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/rojdaayldz/RICH'
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
                dir('RICH/web-frontend') {
                    sh 'docker build -t rich-frontend .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker run -d -p 5000:5000 rich-backend'
                sh 'docker run -d -p 5173:5173 rich-frontend'
            }
        }
    }
}
