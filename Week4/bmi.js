function getName() {
    return prompt("Please enter your name:");
}

function getHeight() {
    return parseFloat(prompt("Please enter your height in metres:"));
}

function getWeight() {
    return parseFloat(prompt("Please enter your weight in kilograms:"));
}

function calculateBmi(weight, height) {
    return weight / (height ** 2);
}

function displayBmi() {

    let name = getName();
    let height = getHeight();
    let weight = getWeight();

    let bmi = calculateBmi(weight, height);

    alert(name + ", your BMI is: " + bmi.toFixed(2));
}

displayBmi();

