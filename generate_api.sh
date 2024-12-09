#!/bin/bash
curl -O https://api.luugo.com.br/api-docs/openapi.yaml
rm -rf luugoapi
mkdir luugoapi
java -jar openapi-generator-cli-7.0.0.jar generate -i ./openapi.yaml -g typescript-fetch -o ./luugoapi
