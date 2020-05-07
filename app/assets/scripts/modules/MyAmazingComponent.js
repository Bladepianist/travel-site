import React from "react"; // If component and the main js file (App.js here) both include this line, webpack will point it to the same reference thus, no bloating.

function MyAmazingComponent() {
    // In JSX you can only have ONE ROOT element (no 2nd div beside the first).
    return( // Following is JSX (https://fr.reactjs.org/docs/introducing-jsx.html). Looks like HTML but it's not.
        <div>
            <h1 className="section-title section-title--blue">This is My Amazing React Component</h1>
            <p>React is great, the sky is blue, grass is green.</p>
        </div>
    );
}

export default MyAmazingComponent;