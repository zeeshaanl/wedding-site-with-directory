#!/bin/bash
OUTPUT="$(echo $@)"
sass public/assets/sass/main.scss public/assets/css/main.css &&
git add . &&
git commit -m "${OUTPUT}" &&
git push heroku master
