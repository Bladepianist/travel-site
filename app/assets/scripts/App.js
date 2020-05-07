import "../styles/styles.css";
import "lazysizes";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
import ClientArea from "./modules/ClientArea";

// React Related Code Goes Here
import React from "react"; // If component and the main js file (App.js here) both include this line, webpack will point it to the same reference thus, no bloating.
import ReactDOM from "react-dom";

// Import React Components that we created
import MyAmazingComponent from "./modules/MyAmazingComponent";

ReactDOM.render(<MyAmazingComponent />, document.querySelector("#my-react-example"));
// React Related Code Ends Here
// Next React topics to research would be "props" and "hooks / useState"

new ClientArea();
new StickyHeader();
new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 70);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

let modal; // By default, typeof(modal) will return "undefined".

document.querySelectorAll(".open-modal").forEach(element => {
    element.addEventListener("click", event => {
        event.preventDefault();
        // If modal wasn't already loaded once.
        if (typeof modal == "undefined") {
            // We are working with a "Promise" here so we don't know when the import will finish thus the "then" and "catch" functions.
            import(/* webpackChunkName: "modal" */"./modules/Modal").then(x => { // The comment in the import gets webpack to name the generated file "modal.bundled.js" instead of "0.bundled.js"
                modal = new x.default(); // Create a new instance of the Modal class and references it with variable modal in the global scope.
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(() => console.log("There was a problem."));
        } else {
            modal.openTheModal();
        }
    });
});

// Autoreload browser rendering (!= browser full page reload) on changes
if (module.hot) {
    module.hot.accept();
}