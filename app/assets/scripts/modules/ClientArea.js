import Axios from "axios";

class ClientArea {

    constructor() {
        this.injectHTML();
        this.form = document.querySelector(".client-area__form");
        this.field = document.querySelector(".client-area__input");
        this.contentArea = document.querySelector(".client-area__content-area");
        this.events();
    }

    events() {
        this.form.addEventListener("submit",event => {
            event.preventDefault();
            this.sendRequest();
        });
    }

    sendRequest() {
        // Axios.post result in a "Promise". "then" when it eventually succeeds, else the "catch" function
        Axios.post("https://angry-easley-2b7a36.netlify.app/.netlify/functions/secret-area", {password: this.field.value}).then(response => {
            this.form.remove();
            this.contentArea.innerHTML = response.data; // Value sent back by the secret function. Here, it's an HTML formatted response therefore, no need to format.
        }).catch(() => {
            this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again.</p>`;
            this.field.value = "";
            this.field.focus();
        });
    }

    injectHTML() {
        document.body.insertAdjacentHTML("beforeend", `
        <div class="client-area">
            <div class="wrapper wrapper--medium">
                <h2 class="section-title section-title--blue">Secret Client Area</h2>
                <form class="client-area__form" action="">
                    <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
                    <button class="btn btn--orange">Submit</button>
                </form>
                <div class="client-area__content-area"></div>
            </div>
        </div>
        `);
    }
}

export default ClientArea;