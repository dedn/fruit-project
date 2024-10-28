# Fruit Project

A simple React application built with TypeScript and Vite that displays a list of fruits using the Fruityvice API.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Linting and Formatting](#linting-and-formatting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Built with **React** and **TypeScript**
- Utilizes **Vite** for fast development and build process
- Linting and formatting using **ESLint** and **Prettier**
- Deploys to GitHub Pages

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dedn/fruit-project.git
   cd fruit-project

2. **Install dependencies using Yarn::**
     yarn install



3. **Start the development server:**
     yarn dev

     Open your browser and visit http://localhost:5173 to see the application in action.


## Scripts

Here are the available scripts you can run:

- **`dev`**: Start the development server.
- **`build`**: Build the project for production.
- **`lint`**: Lint the codebase.
- **`preview`**: Preview the production build locally.
- **`predeploy`**: Build the project before deploying.
- **`deploy`**: Deploy the application to GitHub Pages.
- **`postinstall`**: Automatically run Husky installation after dependencies are installed.

## Dependencies

The project relies on the following key dependencies:

- **React** and **React DOM**: The core libraries for building user interfaces.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: A build tool for faster development and production builds.
- **MUI**: Material UI components for a modern UI.
- **Chart.js** and **react-chartjs-2**: For charting capabilities.

## Linting and Formatting

The project uses **ESLint** for linting and **Prettier** for formatting. To ensure code quality, you can run:
   yarn lint

## Deployment

The application can be deployed to GitHub Pages by running:
   yarn deploy

## Proxy Service

The application uses a proxy service hosted on Heroku to fetch data from an external API. This is done to bypass CORS restrictions that might arise when accessing the API directly from the client side.

### Proxy Endpoint

The proxy endpoint is set to: https://proxy-fruit-project-265fff9e0ca8.herokuapp.com/proxy


### How It Works

1. The Express server is set up to handle CORS requests and serves as a proxy.
2. When a request is made to `/proxy`, the server fetches data from the Fruityvice API and returns it to the client.
3. The client can make requests to the proxy without worrying about CORS issues.

### Example Usage

You can fetch the list of fruits from the proxy service using the following code:

```javascript
const apiService = new ApiService();
const result = await apiService.getDataList<FruitType>();
if (result.success) {
    console.log(result.data); // Handle the retrieved fruit data
} else {
    console.error(result.error); // Handle the error
}















