#!/bin/bash

script_path=$(realpath "$0")
root_dir=$(dirname "$script_path")


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


# Get repo
mkdir -p stage
git clone git@github.com:ViceVersVice/Portfolio.git stage/

# Copy secrets
cp portfolio_secrets stage/
cp postgres_password stage/
cp postgres_user stage/

# Run tests
run_test() {
  cd stage/portfolio && pytest
}


if run_test; then
  echo "TESTS OK"
  cd "$root_dir"

  if [ -d "build" ]; then
    cd build && docker-compose down
    cd "$root_dir"
    yes | rm -R build
    echo "DELETD BUILD DIR"
  fi

  mkdir -p build
  cp -R stage/* build
  cd build && docker-compose -f docker-compose.prod.yml up --build
else
  echo "TESTS FAILED"
fi


# cleanup
cd "$root_dir" && yes | rm -R stage