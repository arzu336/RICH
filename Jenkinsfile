pipeline {
    agent any
    stages {
        stage('Restore Backend') {
            steps {
                sh 'echo "Backend paketleri yükleniyor..."'
                sh 'sleep 2'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'echo "ASP.NET projesi derleniyor..."'
                sh 'sleep 3'
            }
        }
        stage('Install Frontend') {
            steps {
                sh 'echo "Frontend paketleri kuruluyor..."'
                sh 'sleep 2'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'echo "Frontend derleniyor..."'
                sh 'sleep 3'
            }
        }
        stage('Docker Compose Config') {
            steps {
                sh 'echo "Docker ayarları tamamlanıyor..."'
                sh 'sleep 1'
            }
        }
    }
}
