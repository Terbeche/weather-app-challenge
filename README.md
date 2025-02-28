# DataCose Code Challenge: Weather App

## Description

A full-stack weather dashboard application utilizing Nuxt 3 for the frontend, Nuxt UI for user interface elements, and FastAPI for the backend. This application will showcase current weather conditions for user-selected locations and provide detailed forecasts.

## Built With

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)  
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)  
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)  
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-000000?style=for-the-badge&logo=sqlalchemy&logoColor=white)  
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)  
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Live Demo

[Live Demo Link](https://weather-app-dashboard-seven.vercel.app/)

## API Endpoint  
[Weather App API Documentation](https://weather-app-back-end-6533fe6e83fc.herokuapp.com/docs)  

### Project Setup

If you wish to run the project locally, please do the following:

- Clone the repository to your local machine.

```bash
git clone https://github.com/Terbeche/weather-app-challenge.git
```

#### Frontend:

1. Install Node.js and npm if you haven't already.
   To install Node.js, follow the instructions on [Node.js](https://nodejs.org/en/).
2. Go to the dashboard directory:

```bash
cd src/dashboard
```

To install npm with the necessary dependencies, run the following command in your terminal:

```bash
npm install
```

3. Create a .env file in the src/dashboard directory and copy the contents of .env.example into .env and replace the placeholders with their actual values.

4. Once you have the setup and the project locally, you can run the project using the following command in your terminal:

```bash
npm run build
```

5. and if you want to watch the changes live, run the following command (it will run automatically on port 3000):

```bash
npm run dev
```

#### Backend:

1. Go to the api directory:

```bash
cd src/api
```

2. Create a .env file in the src/api directory and copy the contents of .env.example into .env and replace the placeholders with their actual values.

3. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate
```

4. Install the requirements:

```bash
pip install -r requirements.txt
```

4. Start the server(it will run automatically on port 8000):

```bash
uvicorn main:app --reload
```


👤 **Author**

- GitHub: [@Terbeche](https://github.com/Terbeche)
- Twitter: [@twitterhandle](https://x.com/Terbech_Mostefa)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/mustapha-terbeche/)


### Main Page

- **Weather Table:** The homepage should feature a table displaying weather information for each chosen location, including:
  - An icon representing the weather condition, based on the WMO code.
  - The location's name.
  - The current temperature in degrees Celsius.
  - The current rainfall in millimeters.
  - A "Remove" button for each location. Clicking this button should trigger a confirmation popup before the location is deleted from the table.

![table](/design/table.png)

### Detailed Forecast

- **Forecast Sidebar:** Clicking on a row within the table should open a sidebar. This sidebar will provide a detailed temperature and rainfall forecast for the next 7 days for the selected location.

![table](/design/sidebar.png)

### Location Management

- **Add Location:** Incorporate a button above the table to add new locations. This will open a popup where users can search for and select a location to add to the table. Make sure the user can't submit the form if no location was selected.

![table](/design/modal.png)

### Database Integration

- Implement SQLAlchemy with a local Postgres database.
- Design a `Location` model with attributes including id, name, latitude, and longitude.

### API Endpoints

- **Manage Locations:**

  - `GET /locations`: Retrieve a list of all locations saved in the database, including their current weather conditions. This requires integrating with the [OpenMeteo API](https://open-meteo.com/) to fetch weather data based on latitude and longitude.
  - `POST /locations`: Allow adding a new location by providing name, latitude, and longitude.
  - `DELETE /locations/{id}`: Enable location deletion by ID.

- **Weather Forecast:**
  - `GET /forecast/{location_id}`: Provide a detailed 7-day weather forecast for a specified location. This endpoint will call the OpenMeteo API to fetch forecast data based on the location's latitude and longitude stored in the database.

### API Integration

- To fetch weather information, you are to use the [OpenMeteo API](https://open-meteo.com/). Given that this API requires latitude and longitude for location data, utilize [this predefined list of locations](https://gist.github.com/ofou/df09a6834a8421b4f376c875194915c9) as your hardcoded source.

## Evaluation Criteria

Your submission will be assessed based on:

- **Functionality:** Adherence to the requirements and overall functionality of the application.
- **Code Quality:** Organization, readability, and documentation of code.
- **UI/UX Design:** The usability and aesthetic appeal of the application interface.
- **Innovation and Creativity:** Any additional features or enhancements that improve the app's functionality or user experience.

## Submission Guidelines

- Your completed project should be submitted as a ZIP file.
- Include a Loom video walking through the UI.

We look forward to seeing your innovative solution. Best of luck!
