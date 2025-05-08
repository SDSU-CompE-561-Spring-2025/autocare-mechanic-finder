# My Car Care

# 🚗 

My Car Care is a website that's purpose is to make autocare simple and convenient. Users can register their cars, find autoshops, car parts, and keep track of their car's essential information. 

## Features

### Registration and Centralization of Auto Information
#### - Users can create accounts and register cars, and have information such as oil change dates and registration dates easily accessible

### An easy place to find car parts
#### - The website includes a lookup for car parts regarding a certain car that is registered. For example, the User can find the brake light bulb that is needed for a Toyota Camry just by looking up "brake lights" in the car part search.

### Autoshop Finder
#### - The user can enter their location, and the website will show the nearby accessible autoshops when in need.

# How to Setup and Run:

## • Running Backend:
#### 1) Install hatch, see: https://hatch.pypa.io/latest/install/
#### 2) Install uv, see: https://docs.astral.sh/uv/getting-started/installation/
#### 3) Open the repository in VS Code
#### 4) Right-click the "backend" folder and select "Open in Integrated Terminal"
#### 5) Run "uv sync" in the terminal
#### 6) Run "hatch run dev" in the terminal
#### 7) The backend server should begin with links to the server and the fastapi documentation. You can also open your web browser and go to "localhost:8000" for the server or "localhost:8000/docs" for the fastapi swagger ui documentation.

## • Running Frontend:
#### 1) Install node js, see: https://nodejs.org/en/download
#### 2) Install husky by running "npx husky init"
#### 3) Open the repository in VS Code
#### 4) Right-click the "frontend" folder and select "Open in Integrated Terminal"
#### 5) Run "npm install next@latest react@latest react-dom@latest"
    Note: If you get an error stating "running scripts are disabled on this system" on windows running npm, 
	open powershell as an administrator and run "Set-ExecutionPolicy -Scope CurrentUser" 
	then "RemoteSigned" and "Y". Credit to Bivishan S. on Stack Overflow: https://stackoverflow.com/a/79188776

#### 6) To start frontend run "npm run dev"
#### 7) The frontend will now begin to run. You can either press one of the links provided as a result of the previous command or open your web browser and go to "localhost:3000"
