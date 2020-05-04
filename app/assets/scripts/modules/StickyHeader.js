import throttle from "lodash/throttle"; // Useful to run a function (on scrolling here) every X ms or seconds.
import debounce from "lodash/debounce"; // Useful to run a function only when event has finished firing.

class StickyHeader {
    
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.pageSections[0].isFirstSection = true;
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events();
    }

    events() {
        window.addEventListener("scroll", throttle(() =>this.runOnScroll(), 200));
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    runOnScroll() {

        this.determineScrollDirection();

        if(window.scrollY > 60) { // Scroll > 60px
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");
        }

        this.pageSections.forEach(element => this.calcSection(element));
    }

    calcSection(element) {
        // If element is visible on the viewport of the window's browser
        if(window.scrollY + window.innerHeight > element.offsetTop && window.scrollY < element.offsetTop + element.offsetHeight) {
            let scrollPercent = element.getBoundingClientRect().top / this.browserHeight * 100

            if(element.isFirstSection && scrollPercent > 20 && this.scrollDirection == "up") {
                let matchingLink = element.getAttribute("data-matching-link");
                document.querySelector(matchingLink).classList.remove("is-current-link");
            } else if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == "down" || scrollPercent < 33 && this.scrollDirection == "up") {
                let matchingLink = element.getAttribute("data-matching-link");
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(element => element.classList.remove("is-current-link"));
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
        }
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = "down";
        } else {
            this.scrollDirection = "up";
        }
        this.previousScrollY = window.scrollY; // Updating the previous value
    }
}

export default StickyHeader;