# Deployment Guide - GeoAnalyzer

## Overview

This guide provides comprehensive instructions for deploying the GeoAnalyzer application in various environments, from development to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development Deployment](#development-deployment)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Environment Configuration](#environment-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Node.js**: 14.0 or higher
- **npm**: 6.0 or higher
- **Memory**: Minimum 2GB RAM
- **Storage**: 10GB free space
- **Network**: Internet connection for external services

### External Services

- **AI API**: Access to LLM service (qwen3:4b)
- **Map Tiles**: Internet access for Esri imagery
- **Domain**: For production deployment

## Development Deployment

### Local Development Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd geo-chatbot
```

2. **Install Dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd geojson-backend
npm install
cd ..
```

3. **Environment Configuration**
```bash
# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001
REACT_APP_LLM_API_URL=https://apiexbot.harvestguard.ai/api/external/ollama/chat
NODE_ENV=development
EOF
```

4. **Start Services**
```bash
# Terminal 1: Backend
cd geojson-backend
npm start

# Terminal 2: Frontend
npm start
```

5. **Verify Installation**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/health

## Production Deployment

### Server Preparation

1. **Update System**
```bash
sudo apt update && sudo apt upgrade -y
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2**
```bash
sudo npm install -g pm2
```

4. **Create Application User**
```bash
sudo useradd -m -s /bin/bash geoanalyzer
sudo usermod -aG sudo geoanalyzer
```

### Application Deployment

1. **Deploy Code**
```bash
sudo -u geoanalyzer git clone <repository-url> /home/geoanalyzer/geo-chatbot
cd /home/geoanalyzer/geo-chatbot
sudo -u geoanalyzer npm install
```

2. **Build Frontend**
```bash
sudo -u geoanalyzer npm run build
```

3. **Configure Backend**
```bash
cd geojson-backend
sudo -u geoanalyzer npm install --production
```

4. **Environment Configuration**
```bash
sudo -u geoanalyzer cat > /home/geoanalyzer/geo-chatbot/.env << EOF
NODE_ENV=production
REACT_APP_API_URL=https://your-domain.com/api
REACT_APP_LLM_API_URL=https://apiexbot.harvestguard.ai/api/external/ollama/chat
PORT=3001
EOF
```

### Process Management with PM2

1. **Create PM2 Configuration**
```bash
sudo -u geoanalyzer cat > /home/geoanalyzer/geo-chatbot/ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'geoanalyzer-backend',
      script: './geojson-backend/server.js',
      cwd: '/home/geoanalyzer/geo-chatbot',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/geoanalyzer/backend-error.log',
      out_file: '/var/log/geoanalyzer/backend-out.log',
      log_file: '/var/log/geoanalyzer/backend-combined.log'
    }
  ]
};
EOF
```

2. **Create Log Directory**
```bash
sudo mkdir -p /var/log/geoanalyzer
sudo chown geoanalyzer:geoanalyzer /var/log/geoanalyzer
```

3. **Start Application**
```bash
sudo -u geoanalyzer pm2 start /home/geoanalyzer/geo-chatbot/ecosystem.config.js
sudo -u geoanalyzer pm2 save
sudo -u geoanalyzer pm2 startup
```

### Nginx Configuration

1. **Install Nginx**
```bash
sudo apt install nginx -y
```

2. **Create Site Configuration**
```bash
sudo cat > /etc/nginx/sites-available/geoanalyzer << EOF
server {
    listen 80;
    server_name your-domain.com;
    
    # Frontend (React build)
    location / {
        root /home/geoanalyzer/geo-chatbot/build;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Public files
    location /public/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF
```

3. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/geoanalyzer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificate (Let's Encrypt)

1. **Install Certbot**
```bash
sudo apt install certbot python3-certbot-nginx -y
```

2. **Obtain Certificate**
```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal**
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Docker Deployment

### Docker Compose Setup

1. **Create docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./geojson-backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    volumes:
      - ./geojson-backend/public:/app/public
      - backend_logs:/var/log
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://backend:3001
    restart: unless-stopped

volumes:
  backend_logs:
```

2. **Create Backend Dockerfile**
```dockerfile
# geojson-backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create public directory
RUN mkdir -p public/geojson

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
CMD ["npm", "start"]
```

3. **Create Frontend Dockerfile**
```dockerfile
# Dockerfile.frontend
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

4. **Deploy with Docker Compose**
```bash
docker-compose up -d
```

## Cloud Deployment

### AWS Deployment

#### Using EC2

1. **Launch EC2 Instance**
   - AMI: Ubuntu 20.04 LTS
   - Instance Type: t3.medium (minimum)
   - Security Groups: HTTP (80), HTTPS (443), SSH (22)

2. **Follow Production Deployment Steps**

3. **Configure Load Balancer** (Optional)
```bash
# Application Load Balancer configuration
Target Group: geoanalyzer-backend
Health Check: /api/health
Port: 3001
```

#### Using ECS (Fargate)

1. **Create Task Definition**
```json
{
  "family": "geoanalyzer",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-registry/geoanalyzer-backend:latest",
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ]
    }
  ]
}
```

### Google Cloud Platform

#### Using Compute Engine

1. **Create VM Instance**
```bash
gcloud compute instances create geoanalyzer-vm \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud \
  --machine-type=e2-medium \
  --tags=http-server,https-server
```

2. **Follow Production Deployment Steps**

#### Using Cloud Run

1. **Build Container**
```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/geoanalyzer-backend
```

2. **Deploy Service**
```bash
gcloud run deploy geoanalyzer-backend \
  --image gcr.io/PROJECT-ID/geoanalyzer-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Deployment

#### Using App Service

1. **Create App Service**
```bash
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name geoanalyzer \
  --runtime "NODE|18-lts"
```

2. **Deploy Code**
```bash
az webapp deployment source config-zip \
  --resource-group myResourceGroup \
  --name geoanalyzer \
  --src deployment.zip
```

## Environment Configuration

### Production Environment Variables

```env
# Application
NODE_ENV=production
PORT=3001

# Frontend URLs
REACT_APP_API_URL=https://your-domain.com/api
REACT_APP_LLM_API_URL=https://apiexbot.harvestguard.ai/api/external/ollama/chat

# Security
CORS_ORIGIN=https://your-domain.com
JWT_SECRET=your-jwt-secret-key

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/geoanalyzer/app.log

# File Upload
MAX_FILE_SIZE=10485760
MAX_FILES=10
UPLOAD_DIR=/app/public/geojson
```

### Configuration Management

1. **Using dotenv-vault** (Recommended)
```bash
npm install dotenv-vault
npx dotenv-vault new
npx dotenv-vault push
```

2. **Using AWS Parameter Store**
```javascript
const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

const getParameter = async (name) => {
  const result = await ssm.getParameter({
    Name: name,
    WithDecryption: true
  }).promise();
  return result.Parameter.Value;
};
```

## Monitoring & Maintenance

### Application Monitoring

1. **PM2 Monitoring**
```bash
pm2 monit
pm2 logs
pm2 status
```

2. **Log Management**
```bash
# Rotate logs
sudo logrotate -f /etc/logrotate.d/geoanalyzer

# Monitor logs
tail -f /var/log/geoanalyzer/backend-combined.log
```

3. **Health Checks**
```bash
# Create health check script
cat > /home/geoanalyzer/health-check.sh << EOF
#!/bin/bash
curl -f http://localhost:3001/api/health || exit 1
EOF

chmod +x /home/geoanalyzer/health-check.sh

# Add to crontab
*/5 * * * * /home/geoanalyzer/health-check.sh
```

### Performance Monitoring

1. **Install monitoring tools**
```bash
npm install --save express-status-monitor
```

2. **Add to server.js**
```javascript
app.use(require('express-status-monitor')());
```

3. **Access monitoring dashboard**
```
http://your-domain.com/status
```

### Backup Strategy

1. **Database Backup** (if applicable)
```bash
# Backup GeoJSON files
tar -czf backup-$(date +%Y%m%d).tar.gz /home/geoanalyzer/geo-chatbot/geojson-backend/public/
```

2. **Automated Backups**
```bash
# Add to crontab
0 2 * * * /home/geoanalyzer/backup-script.sh
```

### Updates and Maintenance

1. **Application Updates**
```bash
cd /home/geoanalyzer/geo-chatbot
git pull origin main
npm install
npm run build
pm2 restart all
```

2. **System Updates**
```bash
sudo apt update && sudo apt upgrade -y
sudo reboot
```

## Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check logs
pm2 logs geoanalyzer-backend

# Check port availability
netstat -tulpn | grep :3001

# Check file permissions
ls -la /home/geoanalyzer/geo-chatbot/
```

#### High Memory Usage
```bash
# Monitor memory
free -h
htop

# Restart application
pm2 restart geoanalyzer-backend
```

#### File Upload Issues
```bash
# Check disk space
df -h

# Check upload directory permissions
ls -la /home/geoanalyzer/geo-chatbot/geojson-backend/public/

# Check file size limits
grep -r "MAX_FILE_SIZE" /home/geoanalyzer/geo-chatbot/
```

### Performance Optimization

1. **Enable Gzip Compression**
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Implement Caching**
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });
```

3. **Database Optimization** (if applicable)
```javascript
// Add database indexing
// Implement connection pooling
// Use read replicas
```

### Security Hardening

1. **Firewall Configuration**
```bash
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

2. **Fail2ban Setup**
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
```

3. **Regular Security Updates**
```bash
# Add to crontab
0 3 * * 1 apt update && apt upgrade -y
```

## Rollback Procedures

### Application Rollback

1. **Git-based Rollback**
```bash
cd /home/geoanalyzer/geo-chatbot
git log --oneline -10
git checkout <previous-commit-hash>
npm install
npm run build
pm2 restart all
```

2. **Backup-based Rollback**
```bash
# Restore from backup
tar -xzf backup-20240101.tar.gz -C /
pm2 restart all
```

### Database Rollback

1. **File System Restore**
```bash
# Restore GeoJSON files
cp -r /backup/geojson/* /home/geoanalyzer/geo-chatbot/geojson-backend/public/geojson/
```

This deployment guide provides comprehensive instructions for deploying GeoAnalyzer in various environments. Choose the deployment method that best fits your infrastructure requirements and technical expertise.
