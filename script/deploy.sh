#!/bin/sh

SERVICE="$1"
echo "deploy service: ${SERVICE}"

cd $SERVICE

docker pull minyoung403/catch-my-mind-front
docker stop catch-my-mind-front
docker rm catch-my-mind-front
docker run --name=catch-my-mind-front -d -p 80:80 minyoung403/catch-my-mind-front
