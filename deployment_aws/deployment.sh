#!/bin/bash

root_dir=$(dirname "$0")

# Install aws cli if not installed
if ! command -v aws &> /dev/null
then
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  aws configure
fi

# Get repo
mkdir -p stage
git clone git@github.com:ViceVersVice/Portfolio.git stage/

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
  cd build && docker-compose -f docker-compose.yml up --build
else
  echo "TESTS FAILED"
fi

# cleanup
cd "$root_dir" && yes | rm -R stage

