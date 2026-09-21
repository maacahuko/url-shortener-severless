# URL Shortener — Serverless Edition

A full-stack URL shortener built on a serverless AWS architecture, with a cross-platform mobile app frontend.

The Live app which you can certainly try is: https://maacah-url-shortener.netlify.app

## Architecture

- **AWS API Gateway** — HTTP API exposing `POST /shorten` and `GET /{code}`
- **AWS Lambda (Python)** — two functions: one to generate and store short codes, one to look up and redirect
- **Amazon DynamoDB** — stores short code → original URL mappings
- **Expo (React Native)** — mobile app frontend, also exported and deployed as a web app
- **Netlify** — To host the web build of the app so that it can be used by anyone

## How it works

1. User pastes a long URL into the app and taps "Shorten"
2. The app calls the API Gateway endpoint, which triggers a Lambda function
3. The Lambda generates a random short code and saves it to DynamoDB
4. Visiting the short link triggers a second Lambda that looks up the code and redirects to the original URL

## Tech stack

AWS Lambda · API Gateway · DynamoDB · Python · React Native (Expo) · Netlify

## What I learned

Built this to practice designing and wiring a serverless backend end-to-end (IAM roles, Lambda permissions, API Gateway routing) and connecting it to a real mobile frontend.
