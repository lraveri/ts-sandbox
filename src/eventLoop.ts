console.log('A');

queueMicrotask(() => {
    console.log('B');
});

setTimeout(() => {
    console.log('C');
}, 0);

(async () => {
    console.log('D');
    await null;
    console.log('E');
})();

console.log('F');

// A F B D E C
