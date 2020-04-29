const add = function add(a, b) {
  return a + b;
};

add(1, 2);
const a = new Promise(((resolve) => {
  setTimeout(() => {
    console.log(123);
    resolve();
  }, 1000);
}));
console.log(a); // ./src/index.js
// import createHeading from './heading.js'
// import './main.css';
// import readme from "./README.md"
// const heading = createHeading()
// document.body.append(heading)
// eslint-disable-next-line
// console.log('readme');