# 📝 LastFM Music Finder App

## Overview

Welcome to the **LastFM Music Finder**! This application allows users to search for an artist by name and view relevant information, including a brief bio and a display of the artist's top albums. Built using **HTML**, **CSS**, and **JavaScript**, it utilizes the **LastFM API** for dynamic content, providing users with updated information each time they perform a search. The project emphasizes real-time data retrieval, error handling, and responsive design, ensuring a seamless user experience across devices.
## Deployment

The app is live and hosted on Netlify. Check it out here: [Project 2 - LastFM Music Finder](https://lasfmmusicfinder.netlify.app/)
---

### Project Details
- **Project Name**: LastFM Music Finder
- **Developer**: [Muhudin  Alasow](https://muhuala.github.io/muhu/)
- **GitHub Repository**: [Muhudin Alasow](https://github.com/muhuala/muhu)
- **Start Date**: 25.9.2024
- **Completion Date**: 30.11.2024

---

### Key Features
- **Artist Search**: Users can search for any artist by entering their name. The application fetches the artist's profile from LastFM and displays details like their bio and a link to more information.
- **Top Albums**: After the artist profile is displayed, the application automatically fetches and shows a grid of the artist's top albums. Each album includes an image and a link to listen on LastFM.
- **Error Handling**: The app includes clear error messages if a search returns no results or if the input is invalid.
- **Responsive Design**: Designed with flexibility in mind, the app looks great on both desktop and mobile devices, adapting layout and font sizes to enhance readability and usability.
- **Loading Animation**: A “Loading” message displays while data is being retrieved, providing feedback to users during API fetches.

## Project Structure

- **index.html**: Contains the basic structure for the app, including the search input and display containers.
- **styles.css**: Applies the styles for the app, focusing on a clean, modern look that adjusts well to various screen sizes.
- **script.js**: Manages core application logic, including:
  - Capturing user input
  - Fetching artist and album data from the LastFM API
  - Handling errors and updating the DOM dynamically

## Self-Project Evaluation

### General Evaluation
This project allowed me to deepen my knowledge of JavaScript and API integration. Below is my assessment based on the requirements and performance criteria:

| Evaluation Criteria      | My Thoughts                                                                                               |
|--------------------------|-----------------------------------------------------------------------------------------------------------|
| **Functionality**        | The application fully meets functional requirements. Users can search for artists and view album details seamlessly. |
| **Data Retrieval**       | Successfully implemented API calls for both artist and album data, with error handling that ensures smooth operation. |
| **User Interface**       | The UI is visually appealing, intuitive, and responsive, with a clear layout that works well on both desktop and mobile. |
| **Error Handling**       | Provides feedback for invalid searches and network errors, improving the user experience and reliability. |
| **CSS Design**           | CSS is organized and applied effectively. Styles include animations, responsive design, and thoughtful use of space and colors. |
| **Asynchronous Fetching**| Leveraged async JavaScript with Fetch API to retrieve data without page reloads, creating a smooth, dynamic experience. |

### Challenges and Learnings
- **Error Handling**: Implemented error handling for cases like invalid input and network issues. This improved the app's reliability and helped me understand effective feedback techniques.
- **API Integration**: Learned how to structure API calls effectively and manage data from external sources, which significantly boosted my understanding of asynchronous JavaScript.

### Final Self-Grade

Based on the project requirements, I believe my project falls into the **Excellent** range. The LastFM Music Finder meets all essential requirements and incorporates interactive features, showing strong understanding of JavaScript, API integration, and DOM manipulation.

---

### Final Notes
Creating this project was an invaluable experience, reinforcing my skills in JavaScript, error handling, and responsive web design. This app combines functionality, user-centric design, and dynamic content, and I’m eager to build on these skills in future projects.

---

### References
- **LastFM API Documentation**: Learn more about the API used for artist and album information [here](https://www.last.fm/api).

