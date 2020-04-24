import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";

let mobileMenu = new MobileMenu();

// Autoreload browser rendering (!= browser full page reload) on changes
if (module.hot) {
    module.hot.accept();
}