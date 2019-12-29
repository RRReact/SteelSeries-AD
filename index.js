const text = document.querySelectorAll(".text");
const edge = document.querySelector(".edge");
const edge2 = document.querySelector(".edge2");
const slider = document.getElementById("slide");
const right = document.querySelector(".slide1");
const left = document.querySelector(".slide2");
const colors = document.querySelectorAll(".colors");
const logo = document.querySelectorAll(".logo");
const white = document.querySelectorAll(".white-click");
const black = document.querySelectorAll(".black-click");
const features = document.querySelector(".features")
const specifications = document.querySelector(".specifications");
const main = document.querySelector(".main");
const blackHeadset = document.querySelector(".black-h")
const whiteHeadset = document.querySelector(".white-h")
const all = document.body;

let x = window.matchMedia("(max-width:1366px)");
let y = window.matchMedia("(min-width:1367px)");

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
window.onload = () => { startAnimation() }
document.onload = () => { startAnimation }
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
//MediaQuery max-width:1366
const responsiveX = x => {
    function insterAfter(afterNode, newNode) {
        return afterNode.parentNode.insertBefore(newNode, main.afterNode);
    }
    if (x.matches === true
        &&
        !all.contains(document.querySelector(".responsive-features-section"))) {
        //create 2 empty sections 
        featuresSection = document.createElement("section");
        specificationsSection = document.createElement("section");

        //clone nodes
        const clonedFeatures = features.cloneNode(true);
        const clonedSpecifications = specifications.cloneNode(true);

        //remove classes from cloned nodes
        clonedFeatures.removeAttribute("class");
        clonedSpecifications.removeAttribute("class");

        //add new classes classes
        clonedFeatures.classList.add("responsive-features");
        clonedSpecifications.classList.add("responsive-specifications");

        //add cloned nodes to created sections 
        featuresSection.appendChild(clonedFeatures);
        specificationsSection.appendChild(clonedSpecifications);

        //insert to document
        const newFeaturesSection = insterAfter(main, featuresSection);
        const newSpecificationsSection = insterAfter(newFeaturesSection, specificationsSection);

        //add classes
        newFeaturesSection.classList.add("responsive-features-section");
        newSpecificationsSection.classList.add("responsive-specifications-section");

        /// set display:none to "features" and "specifications"
        specifications.style.display = "none";
        features.style.display = "none";

        //set overflow
        all.style.overflow = "visible"




    }
}
//MediaQuery min-width:1366
const responsiveY = y => {
    if (y.matches === true && all.contains(document.querySelector(".responsive-features-section"))) {
        featuresSection.remove();
        specificationsSection.remove();
        features.style.display = "flex";
        specifications.style.display = "flex";
        specifications.style.flexDirection = "column";
    }
}
const startAnimation = () => {


    const checkWidthSpec = () => { if (x.matches) { return "none" } else { return "initial" } }
    const checkWidthFeat = () => { if (x.matches) { return "none" } else { return "flex" } }

    const tl = gsap.timeline();
    tl.set([right, blackHeadset, whiteHeadset, text], { opacity: 1 })
        .from(right, { duration: 1, x: innerWidth })
        .set(right, { clearProps: "transform" })
        .to(logo, { duration: 1, opacity: 1 })
        .to(colors, { duration: 1, opacity: 1 }, "<")
        .from(blackHeadset, { duration: 1, x: innerWidth }, "<")
        .from(whiteHeadset, { duration: 1, x: -innerWidth }, "<")
        .from(text, { duration: 1, x: -innerWidth }, "<")
        .set(features, { display: checkWidthFeat })
        .set(specifications, { display: checkWidthSpec })
}
responsiveX(x);
responsiveY(y);
x.addListener(responsiveX);
y.addListener(responsiveY);

