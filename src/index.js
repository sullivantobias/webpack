import "./styles.css";
import _ from "lodash";
import numRef from "./ref.json";

// Ref

const scc = document.createElement("div");
let scc2 = document.createElement("div");
scc.innerHTML = "BLABLABLA"
console.log(scc, scc2)

 function numToWord(num) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ""
  );
}

 function wordToNum(word) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}

function component() {
  let element = document.createElement("div");
  let button = document.createElement("button");
  let br = document.createElement("br");

  button.innerHTML = "Click me and look at the console!";
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.addEventListener("click", e => {
    console.log("Clicked");

    console.log(numToWord(3), wordToNum("Two"));
  });

  return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("Accepting the updated printMe module!");
    document.body.removeChild(element);
    element = component(); // Re-render the "component" to update the click handler
    document.body.appendChild(element);
  });
}
