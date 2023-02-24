#!/bin/sh

# Wait for postgres to get fully initialized
while ! nc -z db 5432; do sleep 1; done;


npm run db:migrate 
npm run data:import
npm run start