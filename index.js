const text = document.querySelectorAll(".text");
const edge = document.querySelector(".edge");
const edge2 = document.querySelector(".edge2");
const slider = document.getElementById("slide");
const right = document.querySelector(".slide1");
const left = document.querySelector(".slide2");
const colors = document.querySelectorAll(".colors");
const white = document.querySelectorAll(".white-click");
const black = document.querySelectorAll(".black-click");
const features = document.querySelector(".features")
const specifications = document.querySelector(".specifications");
const main = document.querySelector(".main")
const all = document.body;


let x = window.matchMedia("(max-width:1366px)");
let featuresSection = null;
let specificationsSection = null;

window.onmousemove = (e) => {
    let x = getComputedStyle(right).left;
    edge2.style.left = x;
};
window.ontouchmove = (e) => {
    let x = getComputedStyle(right).left;
    edge2.style.left = x;
}
edge.addEventListener("mousedown", () => mouseDrag(event));
edge.addEventListener("touchstart", () => touchDrag(event), { passive: true });

edge2.addEventListener("mousedown", () => mouseDrag(event));
edge2.addEventListener("touchstart", () => touchDrag(event), { passive: true });

white.forEach(item => { item.addEventListener("click", () => blackOrWhite("white")) });
black.forEach(item => { item.addEventListener("click", () => blackOrWhite("black")) });

const mouseDrag = (e) => {
    e.preventDefault();
    text.forEach(item => { item.innerHTML = "<span><</span>Drag<span>></span>"; });
    window.onmousemove = (e) => {
        let x = e.clientX;
        slider.style.left = x + "px";
        let style = getComputedStyle(right).left;
        edge2.style.left = style;
    }
    all.addEventListener("mouseup", removeDragEventListener, true);
}

const touchDrag = (e) => {
    text.forEach(item => { item.innerHTML = "<span><</span>Drag<span>></span>" });
    window.ontouchmove = (e) => {
        let x = e.touches[0].clientX;
        slider.style.left = x + "px";
        let style = getComputedStyle(right).left;
        edge2.style.left = style;
    }
    all.addEventListener("touchend", removeDragEventListener, true);
}
const removeDragEventListener = () => {
    text.forEach(item => { item.innerHTML = "Drag the edge and explore" });
    window.onmousemove = null;
    window.ontouchmove = null;
}

const blackOrWhite = (color) => {
    window.onmousemove = (e) => {
        let style = getComputedStyle(right).left;
        edge2.style.left = style;
    }
    if (color === "white") {
        gsap.to(right, 1, { left: window.innerWidth, ease: "power2.in" })
    } else if (color === "black") {
        gsap.to(right, 1, { left: 0, ease: "power2.in" })
    }
}
const responsive = x => {
    function insterAfter(afterNode, newNode) {
        return afterNode.parentNode.insertBefore(newNode, main.afterNode);
    }
    if (x.matches === true) {
        //create 2 empty sections 
        featuresSection = document.createElement("section");
        specificationsSection = document.createElement("section");
        //clone nodes
        const clonedFeatures = features.cloneNode(true);
        const clonedSpecifications = specifications.cloneNode(true);

        //add cloned nodes to created sections 
        featuresSection.appendChild(clonedFeatures)
        specificationsSection.appendChild(clonedSpecifications)
        //insert to document
        const newFeaturesSection = insterAfter(main, featuresSection);
        const newSpecificationsSection = insterAfter(newFeaturesSection, specificationsSection)
        //add classes
        newFeaturesSection.classList.add("responsive-features");
        newSpecificationsSection.classList.add("responsive-specifications");
        /// set display:none to "features" and "specifications"
        specifications.style.display = "none";
        features.style.display = "none";
        //set overflow
        all.style.overflow = "visible";
        all.style.overflowX = "hidden";

    }
}
responsive(x);
x.addListener(responsive);
