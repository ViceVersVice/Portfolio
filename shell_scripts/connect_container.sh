#!/bin/bash
container_name="$1"
shell=${2:-bash}
docker exec -it $(echo `docker ps | awk -v var="$container_name" '{if($NF==var) print $1}'`) ${shell}