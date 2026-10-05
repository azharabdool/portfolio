# TuToR Marketplace App

A React Native group capstone connecting UCT students with tutors.

## Overview

Create a mobile workflow for student/tutor registration, discovery, profile management, session handling and feedback.

Origin: UCT CSC3003S group capstone, 2024. Azhar Abdool and two teammates; exact individual module ownership is not established by the supplied files.

## Technical Approach

React Native screens and React Navigation coordinate separate student/tutor flows. Firebase Authentication, Firestore and Storage back the app. Source includes wallet/session/review screens; wallet UI is not proof of a production payment integration.

## Tech Stack

React Native 0.74; Expo SDK 51; JavaScript; React Navigation; Firebase JS SDK; AsyncStorage.

## Key Features

- Registration/email verification
- tutor search
- profiles
- meeting/session screens
- ratings/reviews
- wallet UI
- transcript upload.

## Architecture / Pipeline

React Native screens --> React Navigation --> Firebase Auth / Firestore / Storage

## Results

A substantial group application is present in source. All 29 JavaScript/JSX files parsed and their relative imports resolved during cleanup. Authentication/database integration has not been exercised against a fresh Firebase project. No user counts, security certification or production payment claims are made.

## Running the Project

```sh
npm install
# Create .env from .env.example and configure a NEW Firebase project.
# Enable Email/Password Auth, Firestore and Storage with reviewed rules.
npx expo start
```

## Project Structure

screens/: application flows; navigation/: routing; components/: shared UI; Firebase/config.js: environment-based setup; images/: authored replacement text mark.

## What I Learned

Integrating mobile screens with authentication, data persistence, navigation and group software delivery.

## Possible Improvements

Audit server-enforced authorisation and Firestore/Storage rules; test registration and session flows; separate wallet display from real payment processing; modernise Expo in a labelled migration.

## Portfolio Cleanup / Post-project Improvements

Removed deployed Firebase config, recursive file: dependency, node_modules/native generated projects and university logo. Added environment example, corrected the navigator's broken relative screen imports, and imported Alert for an existing error path. Original screen logic and Expo generation preserved. In-app support contacts, terms and wallet screens are original prototype content, not a functioning service or payment promise.
