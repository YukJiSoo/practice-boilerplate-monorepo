#!/bin/bash

'sudo cat /etc/docker/daemon.json | jq ''. + {"insecure-registries": ["45.119.146.88:5000"]}''
    | sudo tee /etc/docker/daemon.json'
sudo systemctl restart docker

sudo cat /etc/docker/daemon.json
