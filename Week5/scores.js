const scores = [80, 45, 90, 30, 70, 100, 55];

// Filter passing scores
const passingScores = scores.filter(score => score >= 50);

// Curve scores (+5 but max 100)
const curvedScores = scores.map(score => {
    const curved = score + 5;
    return curved > 100 ? 100 : curved;
});

// Calculate average
const total = curvedScores.reduce((sum, score) => sum + score, 0);
const average = total / curvedScores.length;

// Log results
console.log("Passing scores:", passingScores);
console.log("Curved scores:", curvedScores);
console.log("Average score:", average);