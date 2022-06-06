#!/bin/bash


# Install docker, docker-compose if not installed
if ! command -v docker &> /dev/null
then
  echo 'Installing docker'
  sudo apt-get update
  sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi

if [ -d "build" ]; then
  cd build
  sudo docker compose -f docker-compose.prod.yml down
  cd ..
  yes | rm -R build/
fi

git clone https://github.com/ViceVersVice/Portfolio.git ./build
sudo cp cert/fullchain.pem build/nginx/
sudo cp cert/privkey.pem build/nginx/
cp secrets/* build/
cd build
sudo docker compose -f docker-compose.prod.yml up --build -d
