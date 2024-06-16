# Smart Building Application

This repository contains the frontend for a Smart Building Application developed using React Native and Expo. The application provides a user-friendly interface to monitor and control various aspects of a smart building, including room conditions, appliances, and rules for automation.

## Features

- View and manage rooms
- Display current state of room conditions (temperature, light, presence)
- Manage appliances within rooms
- Set up and manage automation rules

## Prerequisites

- Node.js (v14.x or later)
- Expo CLI

## Installation

1. **Clone the repository:**

   ```shell
   git clone https://github.com/Husseinhassan1/smart-building-frontend.git
   cd smart-building-frontend
   ```

2. **Install dependencies:**
   npm install

3. **Install Expo CLI if not already installed:**
   npm install -g expo-cli

4. **Link Backend:**

   Ensure that the backend server is running and accessible. Update the API endpoints in your service files to point to the backend server.

   Example service file configuration:

   ```javascript
   // src/services/api.js
   const API_BASE_URL = "192.168.0.17:3000"; // Replace with your backend URL
   ```

## Running the Application

1. **Start the Expo development server:**

   ```shell
   npx expo start
   ```

2. **Open the app:**
   - You can open the app on an Android emulator, iOS simulator, or on a physical device using the Expo Go app.

## Project Structure

- src: Contains all the source code
  - components: Reusable UI components
  - screens: Screen components for different app views
  - services: API service files for backend communication
  - store: Redux store configuration and slices
  - styles: Global styles and theme configurations
