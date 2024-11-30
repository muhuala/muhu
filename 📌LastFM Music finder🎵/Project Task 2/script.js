// Get DOM elements
const searchBtn = document.getElementById('searchBtn');
const artistInput = document.getElementById('artistInput');
const artistInfoDiv = document.getElementById('artistInfo');
const albumInfoDiv = document.getElementById('albumInfo');
const errorPopover = document.getElementById('errorPopover');
const popoverMessage = document.getElementById('popoverMessage');
const loader = document.getElementById('loadingSpinner'); // New loader element

// API Key and URL
const API_KEY = '4317eb80e8fec906aeb5c2d1edcac284';
const API_URL = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=';

// Function to show the custom popover
function showPopover(message) {
    const popover = document.getElementById('errorPopover');
    const popoverMessage = document.getElementById('popoverMessage');
    const artistInput = document.getElementById('artistInput');

    popoverMessage.textContent = message;
    popover.style.display = 'block';
    artistInput.disabled = true; // Disable the input field
}

// Function to close the custom popover
function closePopover() {
    const popover = document.getElementById('errorPopover');
    const artistInput = document.getElementById('artistInput');

    popover.style.display = 'none';
    artistInput.disabled = false; // Enable the input field
}

// Function to show and hide loader
function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const artistName = artistInput.value.trim();

    // Validate input length
    if (artistName.length < 3) {
        showPopover('🚨 Please enter at least 3 characters for the artist\'s name.');
        return;
    }

    // Clear any existing content without showing a loading message
    artistInfoDiv.innerHTML = '';
    albumInfoDiv.innerHTML = ''; 
    artistInfoDiv.style.display = 'none';
    albumInfoDiv.style.display = 'none';

    // Show loader before fetching data
    showLoader();

    // Fetch artist information
    fetchArtistInfo(artistName);
});

// Fetch artist information with error handling for network issues
function fetchArtistInfo(artist) {
    const url = `${API_URL}${artist}&api_key=${API_KEY}&format=json`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch artist information.');
            return response.json();
        })
        .then(data => {
            if (data.error) throw new Error(data.message || 'Artist not found.');
            displayArtistInfo(data);
        })
        .catch(error => {
            if (!navigator.onLine) {
                showPopover("Oops!😥 Make sure you have an internet connection.");
            } else {
                showPopover(`🚨 ${error.message}`);
            }
        })
        .finally(() => {
            hideLoader(); // Hide loader once data is fetched or an error occurs
        });
}

// Display artist information
function displayArtistInfo(data) {
    const { artist } = data;
    const bioSummary = artist.bio?.summary || "No bio available for this artist.";

    artistInfoDiv.innerHTML = `
        <div class="artist-card">
            <h2 class="artist-name">${artist.name}</h2>
            <p class="artist-bio"><strong>Bio:</strong> ${bioSummary}</p>
            <a href="${artist.url}" target="_blank" class="artist-link">More on Last.fm</a>
        </div>
    `;
    artistInfoDiv.style.display = 'block';
    fetchAlbums(artist.name);
}

// Fetch album information with error handling
function fetchAlbums(artistName) {
    const albumUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistName}&api_key=${API_KEY}&format=json`;

    fetch(albumUrl)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch albums.');
            return response.json();
        })
        .then(data => {
            if (!data.topalbums || !data.topalbums.album || data.topalbums.album.length === 0) {
                throw new Error('No albums found for this artist.');
            }
            displayAlbums(data);
        })
        .catch(error => {
            showPopover(`🚨 ${error.message}`);
        })
        .finally(() => {
            hideLoader(); // Hide loader after albums are displayed or an error occurs
        });
}

// Display albums
function displayAlbums(data) {
    const albums = data.topalbums.album;

    // Display only up to 36 albums
    albumInfoDiv.innerHTML = albums
        .filter(album => album.image[2]['#text'])  // Filter out albums without an image
        .slice(0, 36)  // Limit to 36 albums for display
        .map(album => `
            <div class="album">
                <img src="${album.image[2]['#text']}" alt="${album.name}">
                <h4>${album.name}</h4>
                <a href="${album.url}" target="_blank">Listen on Last.fm</a>
            </div>
        `).join('');

    // Show album grid only when albums are loaded
    albumInfoDiv.style.display = 'grid';

    // If there are more than 36 albums, add a centered "See More" link
    if (albums.length > 36) {
        const artistUrl = data.topalbums['@attr'].artist ? 
            `https://www.last.fm/music/${encodeURIComponent(data.topalbums['@attr'].artist)}/+albums` : 
            'https://www.last.fm';

        albumInfoDiv.innerHTML += `
            <div class="see-more">
                <a href="${artistUrl}" target="_blank">See more albums</a>
            </div>
        `;
    }
}




//Go Up arrow 

const goUpArrow = document.getElementById('goUpArrow');

// Scroll to the top when the "Go Up" arrow is clicked
goUpArrow.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Display albums and manage the "Go Up" arrow visibility
function displayAlbums(data) {
    const albums = data.topalbums.album;

    // Display albums or show a message if no albums are available
    if (albums.length === 0) {
        albumInfoDiv.innerHTML = '<p>No albums found for this artist.</p>';
        goUpArrow.style.display = 'none'; // Hide the "Go Up" arrow
        return;
    }

    albumInfoDiv.innerHTML = albums
        .filter(album => album.image[2]['#text']) // Filter albums with images
        .slice(0, 36) // Limit display to 36 albums
        .map(album => `
            <div class="album">
                <img src="${album.image[2]['#text']}" alt="${album.name}">
                <h4>${album.name}</h4>
                <a href="${album.url}" target="_blank">Listen on Last.fm</a>
            </div>
        `).join('');

    albumInfoDiv.style.display = 'grid';

    // Check visibility of the last album after rendering
    checkLastAlbumVisibility();
}

// Function to check if the last album is visible
function checkLastAlbumVisibility() {
    const lastAlbum = document.querySelector('.album:last-child'); // Select the last album element

    if (lastAlbum) {
        const rect = lastAlbum.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            goUpArrow.style.display = 'flex'; // Show the "Go Up" arrow
        } else {
            goUpArrow.style.display = 'none'; // Hide the "Go Up" arrow
        }
    } else {
        goUpArrow.style.display = 'none'; // Hide the arrow if no albums are displayed
    }
}

// Monitor scroll events to check for the visibility of the last album
window.addEventListener('scroll', checkLastAlbumVisibility);
