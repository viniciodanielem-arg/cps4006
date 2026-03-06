// userData.js

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(users => {

        // Display each user's name and email
        users.forEach(user => {
            console.log(`Name: ${user.name}, Email: ${user.email}`);
        });

        // BONUS: Create a new array with name + email only
        const userInfo = users.map(user => {
            return {
                name: user.name,
                email: user.email
            };
        });

        console.log("New Array:", userInfo);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });