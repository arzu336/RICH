pipeline {
    agent any
    stages {
        stage('Docker Build ve Run') {
            steps {
                script {
                    // 1. Varsa eski konteynerleri durdur ve temizle (Hata almamak için)
                    sh 'docker stop api-container frontend-container || true'
                    sh 'docker rm api-container frontend-container || true'

                    // 2. API'yi Build et ve 5000 portunda çalıştır
                    // -f ile hangi Dockerfile'ı kullanacağını söylüyoruz
                    sh 'docker build -f Dockerfile.api -t rich-api-image .'
                    sh 'docker run -d --name api-container -p 5000:5000 rich-api-image'

                    // 3. Frontend'i Build et ve 80 portunda çalıştır
                    dir('web-frontend') {
                        sh 'docker build -t rich-frontend-image .'
                        sh 'docker run -d --name frontend-container -p 80:80 rich-frontend-image'
                    }
                }
            }
        }
    }
}