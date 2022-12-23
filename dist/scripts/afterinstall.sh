#!/bin/bash

# cd to correct dir
cd /home/takeawaygamble

# Set env var
sudo cp /home/secrets/.env /home/takeawaygamble/.env
sudo chmod 444 /home/takeawaygamble/.env