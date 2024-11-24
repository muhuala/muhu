// ---------------- Exercise 1: JSON Basics ----------------
        var text = '{ "employees" : [' +
            '{ "firstName":"John" , "lastName":"Doe" },' +
            '{ "firstName":"Anna" , "lastName":"Smith" },' +
            '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

        // Function to display first and last names only
        function displayFirstAndLastNames() {
            var obj = JSON.parse(text);
            var output = "";
            obj.employees.forEach(function(employee) {
                output += employee.firstName + " " + employee.lastName + "<br>";
            });
            document.getElementById("jsondata").innerHTML = output;
        }

        // Function to display all data (full object)
        function displayAllData() {
            var obj = JSON.parse(text);
            var output = JSON.stringify(obj, null, 2);
            document.getElementById("jsondata").innerHTML = "<pre>" + output + "</pre>";
        }

        // ---------------- Exercise 2: Parsing JSON from Web ----------------
        const omdbAPIUrl = 'https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750';

        // Function to load raw data
        function loadRawData() {
            document.getElementById("rawdata").innerHTML = "Fetching data...";
            fetch(omdbAPIUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("rawdata").innerHTML = JSON.stringify(data, null, 2);
                })
                .catch(error => {
                    document.getElementById("rawdata").innerHTML = "Error fetching data.";
                    console.error('Error:', error);
                });
        }

        // Function to load and parse data (as a table)
        function loadAndParseData() {
            document.getElementById("rawdata").innerHTML = "Fetching data...";
            fetch(omdbAPIUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.Search && data.Search.length > 0) {
                        let output = '<table><tr><th>Movie title</th><th>Year</th><th>Poster</th></tr>';
                        data.Search.forEach(movie => {
                            output += `<tr>
                                <td>${movie.Title}</td>
                                <td>${movie.Year}</td>
                                <td><img src="${movie.Poster}" alt="${movie.Title}"></td>
                            </tr>`;
                        });
                        output += '</table>';
                        document.getElementById("rawdata").innerHTML = output;
                    } else {
                        document.getElementById("rawdata").innerHTML = "No results found.";
                    }
                })
                .catch(error => {
                    document.getElementById("rawdata").innerHTML = "Error fetching data.";
                    console.error('Error:', error);
                });
        }

        // ---------------- Exercise 3: Weather App (OpenWeatherMap API) ----------------
        const apiKey = '4810dd3a27a5fa78d4259804aadb6c76';

        // Function to fetch weather data for selected city
        function fetchWeatherData() {
            const city = document.getElementById('city').value;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            document.getElementById("weatherdata").innerHTML = "Fetching data...";

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    displayWeatherData(data);
                })
                .catch(error => {
                    document.getElementById("weatherdata").innerHTML = "Error fetching data. Please try again.";
                    console.error('Error:', error);
                });
        }

        // Function to search weather data for typed city name
        function searchCity() {
            const city = document.getElementById('citysearch').value;
            if (city === '') {
                document.getElementById("weatherdata").innerHTML = "Please enter a city name.";
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            document.getElementById("weatherdata").innerHTML = "Fetching data...";

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    displayWeatherData(data);
                })
                .catch(error => {
                    document.getElementById("weatherdata").innerHTML = "Error fetching data. Please try again.";
                    console.error('Error:', error);
                });
        }

        // Function to display weather data in the div
        function displayWeatherData(data) {
            if (data.cod !== 200) {
                document.getElementById("weatherdata").innerHTML = `Error: ${data.message}`;
                return;
            }

            const output = `
                <h3>Weather in ${data.name}</h3>
                <strong>Temperature:</strong> ${data.main.temp}°C<br>
                <strong>Clouds:</strong> ${data.clouds.all}%<br>
                <strong>Humidity:</strong> ${data.main.humidity}%<br>
                <strong>Weather:</strong> ${data.weather[0].description}<br>
            `;

            document.getElementById("weatherdata").innerHTML = output;
        }

        // Call fetchWeatherData on page load to display weather for the default city
        window.onload = function() {
            fetchWeatherData();
        };