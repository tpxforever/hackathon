# Chronos

Chronos is a web application that enables users to store and share memories through a personalized "capsule" feature. Users can create capsules to store images, text, videos, and share them with friends while customizing the capsule's themes, visibility, and duration. Chronos offers a premium version with additional features such as increased upload limits and extended duration options.

## Project Structure

- **HTML Files**: Define the structure and layout of the pages.
  - `home.html`: The main landing page.
  - `dashboard.html`: User dashboard, showing profile, friends, and capsules sections.
  - `login.html`: Login page for user authentication.

- **JavaScript Files**:
  - `dashboard.js`: Handles dashboard animations and interactions.
  - `login.js`: Manages login form submission, storing credentials in localStorage.
  - `script.js`, `index.js`: Other scripts for managing frontend functionality.
  
- **CSS Files**:
  - `style.css`: The main stylesheet, providing consistent styling across pages with custom animations and transitions.

- **Backend Files** (Node.js with Express/MongoDB for database connection):
  - `app.js`: Main server file, initializes the Express app and defines routes.
  - `dbConfig.js`: Database configuration file for MongoDB connection.
  - `userController.js`, `userModel.js`, `userRoutes.js`: Handle user-related actions like login, registration, and capsule management.

## Features

1. **Landing Page**: A welcoming page with "Explore" and "Login" options.
2. **Login Functionality**: 
   - LocalStorage is used for basic credential storage and retrieval.
   - Username and password are removed from storage post-login for security.
3. **Dashboard**:
   - **Profile Section**: Displays user profile information.
   - **Friends Section**: Shows friend list and friend request management.
   - **Capsules Section**: Allows creation, modification, and deletion of capsules.
4. **Capsules**:
   - **Themes**: Capsules can have customizable themes.
   - **Visibility**: Capsules are either private or shared.
   - **Premium Features**: Increased upload limit, more friends per capsule, longer storage duration.

## Usage

### Running the Project

1. **Frontend**:
   - Open the HTML files in your preferred browser.
   
2. **Backend**:
   - Navigate to the backend folder and install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     node app.js
     ```

3. **Database**:
   - MongoDB Atlas is used for database storage, and connection settings are provided in `dbConfig.js`.

### Testing the Application

- Access the landing page (`home.html`) and explore the basic features.
- Register or log in with a user account.
- Create and manage capsules from the dashboard.

## Classes

### User Class
The `User` class manages the user profile, friend list, and capsules.

#### Key Methods:
- `addFriend(friendID)`: Sends a friend request.
- `updatePremium(confirmPurchase)`: Upgrades the user to premium.
- `processFriendRequest(friendID, friendListPending, friendList, accepted)`: Accepts or rejects a friend request.
- `removeFriend(friend)`: Removes a friend from the friend list.
- `getUserInfo()`: Retrieves user information.

### Capsule Class
The `Capsule` class manages individual capsules, with customizable options for each.

#### Key Methods:
- `premiumCheck(premium)`: Updates capsule settings for premium users.
- `addFriendToCapsule(friend, friendList)`: Adds a friend to the capsule’s shared list.
- `setEndDate(sliderVal)`: Sets the expiration date for the capsule.

## Animations

The project uses CSS animations to enhance the user experience:
- **Fade In Effects**: Used on buttons, text, and images to create smooth transitions.
- **Slide-In Sidebar**: The sidebar slides in on the dashboard page load.
- **Dot Animation**: A circle animation is triggered on the landing page to transition to the dashboard.

## Fonts and Styling

The project uses the **Satoshi** font for all headings and buttons, ensuring a clean and modern look. Key styling includes a dark theme, with transitions and hover effects for interactive elements.

## Dependencies

- **Node.js** and **Express**: Backend framework and server management.
- **MongoDB Atlas**: Cloud database storage.
- **FontShare**: External font service for the Satoshi font.

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit.
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License.

