let suite = {
  name: "Regression Suite",
  tests: [
    { id: 1, name: "Login Test", status: "Passed" },
    { id: 2, name: "Signup Test", status: "Failed" }
  ]
};
// Convert to JSON
let jsonData = JSON.stringify(suite);
console.log(jsonData);

// Parse JSON back to object
let parsed = JSON.parse(jsonData);

console.log(parsed.tests[0].name);

const uiTests = ["Login", "Signup"];
const apiTests = ["GetUser", "PostData"];
console.log(uiTests);
console.log(...uiTests);

const allTests = [...uiTests,apiTests];
console.log(allTests);


let original =["Apple","Banana","Grapes"];
console.log(original);
let copy = original;
console.log(copy);
let spread= (...original)=>
console.log(...original);