#!/bin/bash

read -p "Enter Location ID where app is to run: " location_id

if [ "$location_id" == "" ]; then 
  echo "A valid Location ID is required, exiting..."
  exit
fi

get_keys () {
  read -p "Enter Google Sheet ID: " google_sheet_id
  read -p "Enter Google API Key: " google_api_key
}


startup () {
  LOCATION_ID=$location_id \
  GOOGLE_SHEET_ID=$google_sheet_id \
  GOOGLE_API_KEY=$google_api_key \
  docker compose up --build
}


echo "Do Data Import"
select yn in "Yes" "No"; do
  case $yn in
    Yes ) get_keys; break;;
    No ) break;;
  esac
done


startup