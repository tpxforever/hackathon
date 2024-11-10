# Chronos

Chronos is a web based application for users to store their data such as question answers or photos for a specified locked amount of time in our "capsule" system to see how far life has come.

## Disclaimer
- This program was mainly developed using Mac screen resolution of "2560x1600" due to time constraints, UI may alter on larger resolutions 

## Project Structure

- **HTML Files**: Define the structure and layout of the pages.
  - `index.html`: The main landing page.
  - `dashboard.html`: User dashboard, showing profile, friends, and capsules sections.
  - `login.html`: Login page for user authentication.

- **JavaScript Files**:
  - `dashboard.js`: Handles dashboard animations and interactions.
  - `login.js`: Manages login form submission, storing credentials in localStorage.
  - `script.js`, `index.js`: Other scripts for managing frontend functionality.
  
- **CSS Files**:
  - `style.css`: The main stylesheet, providing consistent styling across pages with custom animations and transitions.

- **Backend Files** 
  - `app.py`: Main server file, initializes the Express app, defines routes as well as manages password encryption for DB.
  - `main.db`: Database management file for handling user and capsule data
 
## Database Structure

- `User`:
  - id INT PK
  - username TEXT UNIQUE
  - password TEXT

- `capsule`:
  - id INT
  - user.username FK
  - answer1 TEXT
  - answer2 TEXT
  - answer3 TEXT
  - answer4 TEXT
  - answer5 TEXT
  - Expiration_date TEXT

### Running the Project
   
1. **Backend**:
   - Navigate to the command prompt:
     ```bash
     python3 app.py
     ```
 2. **Frontend**:
   - Navigate to URL:
     ```bash
     http://127.0.0.1:5001
     ```

### Testing the Application

- Access the landing page (`index.html`) and explore the basic features.
- Register or log in with a user account.
- Create and manage capsules from the dashboard.

## Animations

The project uses CSS & JavaScript animations to enhance the user experience:
- **Fade In Effects**: Used on buttons, text, and images to create smooth transitions.
- **Slide-In Sidebar**: The sidebar slides in on the dashboard page load.
- **Dot Animation**: A circle animation is triggered on the landing page to transition to the dashboard.

## Fonts and Styling

The project uses the **Satoshi** font for all headings and buttons, ensuring a clean and modern look. Key styling includes a dark theme, with transitions and hover effects for interactive elements.

## Dependencies
- **FontShare**: External font service for the Satoshi font.
- **Python Flask**: Backend framework for bridging frontend with DBMS.
- **SQL lite**: Database managemnt system for storing user data.



## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit.
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License.

