#!/bin/bash

# Stop all servers and start the server as a daemon
pm2 stop takeaway-gamble
pm2 start /home/takeawaygamble/server.js --max-memory-restart 2048M --name takeaway-gamble -- --max-old-space-size=2048
