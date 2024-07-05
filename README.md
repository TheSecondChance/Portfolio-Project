# Chrome Extension with React Frontend and Django Backend

This project is a Chrome Extension that integrates a React frontend with a Django backend. The extension offers various functionalities, leveraging both modern frontend and backend technologies.

## Project Structure

Extension: Contains the React frontend code.  
backend: Contains the Django backend including djanog setting.py
core: Contains the core logic and configuration for the backend.

## Purpose

The extension provides a simple pop-up question at set intervals to remind developers of simple logic, syntax, and programming concepts.  
It serves as a tool to keep programming knowledge fresh and to practice problem-solving regularly.

## Backend

Navigate to the backend directory and follow these steps:

Create and Activate Virtual Environment:

```
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

Install Dependencies:

```
pip install -r requirements.txt
```

Run Migrations:

```
python3 manage.py migrate
```

Create Superuser:

```
python3 manage.py createsuperuser
```

Start Development Server:

```
python3 manage.py runserver
```

## Frontend

Navigate to the Extension directory and follow these steps:

Install Dependencies:

```
cd Extension
npm install
```

Start Development Server:

```
npm run build
```

## Load Extension:

Open Chrome and go to chrome://extensions/
Enable "Developer mode"
Click "Load unpacked" and select the Extension/build directory

## Access Backend:

Navigate to http://127.0.0.1:8000 to access the Django backend
