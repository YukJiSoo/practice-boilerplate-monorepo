#!/bin/sh

echo "$(pwd)"

SERVICE="$1"
echo "deploy service: ${SERVICE}"

cd practice-boilerplate-monorepo/$SERVICE
pwd

echo "$(pwd)"
