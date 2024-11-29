## 🎮 Video Game eCommerce Website

### Description

This is a fully functional video game eCommerce platform designed for users to browse, search, and purchase their favorite games. The site features a sleek interface with categorized game sections, a wishlist, a dynamic shopping cart, user authentication, and a demo checkout system.

Users can explore new and popular games, filter by platform and genre, and manage their cart and wishlist seamlessly. The platform is powered by the RAWG API for fetching game details and includes custom pricing rules to simulate a real-world store experience.

## Purpose of the Project

I created this project as part of my portfolio to demonstrate my skills in full-stack web development, including:

- Frontend development with React for creating a dynamic, responsive, and user-friendly interface.
- Backend development with Node.js and Express for building APIs and managing authentication.
- Integration with third-party APIs like RAWG for fetching real-time game data.
- Database management with MongoDB for user authentication and wishlist persistence.
- Implementing secure user authentication and authorization with JWT.
- State management using React Context for the cart and wishlist features.
- This project showcases my ability to build and deploy full-stack web applications and highlights my skills in problem-solving, API integration, and user experience design.

## Features

- 🛒 Shopping Cart: Add and manage items in a cart with dynamic pricing.
- ❤️ Wishlist: Save favorite games and retrieve them on login.
- 🔍 Search: Search games by title using the RAWG API.
- 🎮 Game Categories: Browse games by platform and genre.
- 🖼️ Media Showcase: View game details, including images and videos, on a dedicated product page.
- 🧾 Checkout System: Demo checkout with dynamic totals and payment confirmation.
- 🔒 User Authentication: Secure login and registration using JWT.
- 🌐 Mobile Responsive Design: Optimized for various screen sizes.

## Installation and Setup

Prerequisites
Ensure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Steps to Run the Project

Clone the repository:

```
git clone https://github.com/your-repo/video-game-store.git
cd video-game-store
```

Install dependencies:

`npm install`

### Set up environment variables:

Create a .env file in the root directory and add:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
RAWG_API_KEY=your_rawg_api_key
RAWG_API_BASE_URL=https://api.rawg.io/api
```

Start the development server:

- Backend:
  `npm run server`

* Frontend:
  `npm run client`

Access the app: Open http://localhost:3000 in your browser.

## Technologies Used

### Frontend:

- React
- React Context for state management
- CSS for styling
- Axios for API requests

### Backend:

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RAWG API for game data

## Author

Mpilonhle Mtungwa<br>
💼 Aspiring Software Developer<br>
📧 mtungwampilonhle@gmail.com<br>
💻 https://github.com/MpilonhleMtungwa

## Future Improvements

- Implement real payment gateway integration.
- Add a review and rating system for games.
- Introduce advanced filtering and sorting options.
- Include multi-language and currency support.
- Optimize performance for large datasets.

## Screenshots

### Homepage with slideshow and product cards

![HomePage](../Frontend/src/assets/home%20page.PNG)
<br>
![ProductCards](../Frontend/src/assets/Game%20Cards.PNG)

### Product detail page with media and overview

![Product Detail Page](../Frontend/src/assets/Product%20Detail%20page.PNG)

### Wishlist

![WishList](../Frontend/src/assets/wishlist%20page.PNG)

### Cart

![cart](../Frontend/src/assets/Cart%20game%20Page.PNG)

## License

This project is licensed under the MIT License. Feel free to use and modify it for your purposes.
