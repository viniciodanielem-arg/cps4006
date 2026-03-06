function createAdvancedCounter() {
    let count = 0;

    return {
        increment() {
            count++;
            console.log(`Count: ${count}`);
        },

        decrement() {
            count--;
            console.log(`Count: ${count}`);
        },

        reset() {
            count = 0;
        },

        set(value) {
            count = value;

        },

        getCount() {
            return count;
        }
    };
}

const counter = createAdvancedCounter();

counter.increment;
counter.increment;
counter.increment;

counter.decrement;

counter.reset;

counter.increment;
counter.increment;
counter.increment;
counter.increment;
counter.increment;

counter.set(1);
console.log(counter.getCount());