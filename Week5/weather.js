// Simulated async weather fetch
async function getWeather(city) {
    try {
        const weatherData = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (city === "London") {
                    resolve({
                        city: city,
                        temperature: 20,
                        condition: "Sunny"
                    });
                } else {
                    reject("City not found");
                }
            }, 2000); // 2 second delay
        });

        displayWeather(weatherData);

    } catch (error) {
        console.log("Error:", error);
    }
}


// Display function
function displayWeather(weatherData) {
    console.log(
        `The weather in ${weatherData.city} is ${weatherData.temperature}°C and ${weatherData.condition}.`
    );
}


// Testing
getWeather("London");
getWeather("Paris");