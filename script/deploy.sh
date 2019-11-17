#!/bin/sh

SERVICE="$1"
echo "deploy service: ${SERVICE}"

cd practice-boilerplate-monorepo/$SERVICE

if ["${SERVICE}" = "cocode"]; then
    sshpass -p "${COCODE_PASSWORD}" ssh -o StrictHostKeyChecking=no root@"${COCODE_IP}" echo "cocode"
elif [SERVICE = "api-server"]; then
    sshpass -p "${API_SERVER_PASSWORD}" ssh -o StrictHostKeyChecking=no root@"${API_SERVER_IP}" echo "api-server"
else
    echo "${SERVICE} nono!"
fi
