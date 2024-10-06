#!/bin/bash
echo [INFO] Node install
sudo mkdir -p $1/node_modules
sudo chown -R $2 $1/node_modules
npm install --prefix $1 $1
