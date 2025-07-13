// Domanda 1: Funzioni e scope
// Scrivi una funzione createCounter che ritorna un oggetto con due metodi:

// increment: aumenta un contatore interno.

// getCount: restituisce il valore corrente del contatore.

// Il contatore deve essere privato (non accessibile direttamente dall'esterno).

type Counter = {
    increment: () => void;
    getCount: () => number;
};

function createCounter() {
    let count = 0;
    return {
        increment: () => {
            count++;
        },
        getCount: () => {
            return count;
        }
    };
}

const counter = createCounter();
// console.log(counter.count);
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
