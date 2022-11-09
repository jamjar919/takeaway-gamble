#!/bin/bash

# Install node.js + yarn
sudo curl --silent --location https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum -y install nodejs
sudo npm install --global yarn

# Install forever module
# https://www.npmjs.com/package/forever
sudo yarn install forever -g

# Clean working folder
sudo find /home/takeawaygamble -type f -delete
