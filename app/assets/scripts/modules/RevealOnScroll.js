import throttle from "lodash/throttle"; // Useful to run a function (on scrolling here) every X ms or seconds.
import debounce from "lodash/debounce"; // Useful to run a function only when event has finished firing.

class RevealOnScroll {
    
    constructor(elements, thresholdPercent) {
        this.thresholdPercent = thresholdPercent;
        this.itemsToReveal = elements;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this); // This.scrollThrottle calls this.calcCaller every 200ms on scroll event
        this.events();
    }

    events() {
        // Call this.scrollThrottle on scroll event
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            console.log("Resize just ran");
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        //console.log("Scroll function ran");
        this.itemsToReveal.forEach(element => {
            if(element.isRevealed == false) {
                this.calculateIfScrollTo(element);
            }
        });
    }

    calculateIfScrollTo(element) {
        if(window.scrollY + this.browserHeight > element.offsetTop) {
            //console.log("Element was calculated");
            let scrollPercent = (element.getBoundingClientRect().top / this.browserHeight) * 100;
            if(scrollPercent < this.thresholdPercent) {
                element.classList.add("reveal-item--is-visible");
                element.isRevealed = true;

                if(element.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(element => {
            element.classList.add("reveal-item");
            element.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}

export default RevealOnScroll;