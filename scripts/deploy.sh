#!/bin/bash


set -e

echo "Starting deployment..."

npm install
npm test
npm run lint

docker build -t devin-audit-test:latest .

docker-compose down
docker-compose up -d

echo "Deployment completed successfully!"
