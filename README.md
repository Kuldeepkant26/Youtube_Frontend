# React + Vite

Live link  - https://youtube-frontend-two.vercel.app/


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# YouTube Clone - Frontend

This is the frontend of a YouTube clone application built with **React**, **React Router**, and **Axios**. The app allows users to browse, search, and filter videos, authenticate, manage channels, and interact with videos.


## Features

- **Home Page**:
  - Displays a YouTube-like header.
  - Toggleable sidebar from the hamburger menu.
  - Filter videos by category.
  - Displays video grid with title, thumbnail, channel name, and views.

- **User Authentication**:
  - Register and log in using email and password.
  - JWT-based authentication for secure sessions.
  - Sign-in button visible in the header when not logged in.

- **Search & Filter**:
  - Search videos by title.
  - Filter videos using category buttons.

- **Video Player**:
  - Play video and display:
    - Title, description, and channel name.
    - Like and dislike buttons.
    - Comment section (add, edit, delete comments).

- **Channel Page**:
  - Users can create and manage their channels (add, edit, delete videos).
  - Displays channel details and a list of uploaded videos.

- **Responsive Design**:
  - Fully responsive across mobile, tablet, and desktop devices.

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB (for backend API)
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB (using MongoDB Atlas or local instance)


