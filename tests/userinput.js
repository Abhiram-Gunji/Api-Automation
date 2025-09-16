const readline = require('readline');
const rl =readline.createInterface({
    input : process.stdin,
    outpit : process.stdout
});

rl.question("What is your name? ", (answer) => {
  console.log(`Hello, ${answer}!`);
  rl.close(); // Always close the interface
});