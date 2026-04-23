pipeline {
    agent any
    stages {
        stage('Temizlik ve Hazırlık') {
            steps {
                sh 'docker stop api-cont frontend-cont || true'
                sh 'docker rm api-cont frontend-cont || true'
            }
        }
        stage('Docker Build ve Run') {
            steps {
                script {
                    // Docker'a package.json'ın web-frontend içinde olduğunu söylüyoruz
                    sh 'docker build -f Dockerfile.api -t rich-api ./web-frontend'
                    sh 'docker run -d --name api-cont -p 5000:5000 rich-api'

                    sh 'docker build -t rich-frontend ./web-frontend'
                    sh 'docker run -d --name frontend-cont -p 80:80 rich-frontend'
                }
            }
        }
    }
}