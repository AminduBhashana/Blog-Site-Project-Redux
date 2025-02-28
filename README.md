# React-Redux Blog Post Project

A simple blog application built with React, using [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as the backend. This project allows users to view, create, edit, and delete blog posts. Users can also view posts by individual authors and react to posts.

This project was created to practice and understand how Redux Toolkit works for state management in React.

## Features

- **View Posts**: Fetch and display all blog posts.
- **Create Posts**: Add new blog posts.
- **Edit Posts**: Update existing posts.
- **Delete Posts**: Remove posts from the list.
- **User-Specific Posts**: View posts by individual users.
- **React to Posts**: react using multiple emojis on posts (simulated locally).

## Technologies Used

- **React**: Frontend library
- **Redux Toolkit**: State management
- **Axios**: HTTP client for API requests
- **JSONPlaceholder**: Fake REST API for testing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Blog-Site-Project-Redux.git
   ```

2. Navigate to the project folder:
   ```bash
   cd Blog-Site-Project-Redux
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the app:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`.

## How It Works

- **View Posts**: All posts are fetched and displayed on the homepage.
- **Create Post**: Click "Add Post" to create a new blog post.
- **Edit Post**: Click "Edit Post" on a post to update its content.
- **Delete Post**: Click "Delete Post" to remove a post.
- **User-Specific Posts**: Click on a user's name to view their posts.
- **React to Posts**: react on posts (reactions are simulated locally and not saved to the API).

## API Endpoints Used

- **Posts**: `https://jsonplaceholder.typicode.com/posts`
- **Users**: `https://jsonplaceholder.typicode.com/users`

### Acknowledgments

- Special thanks to [Dave Gray](https://www.youtube.com/@DaveGrayTeachesCode) for his amazing [Redux Toolkit Tutorial](https://www.youtube.com/watch?v=NqzdVN2tyvQ). It helped me understand Redux Toolkit better!

---

