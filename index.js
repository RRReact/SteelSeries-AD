const text = document.querySelectorAll(".text");
const edge = document.querySelector(".edge");
const edge2 = document.querySelector(".edge2");
const slider = document.getElementById("slide");
const right = document.querySelector(".slide1");
const left = document.querySelector(".slide2");
const colors = document.querySelectorAll(".colors");
const white = document.querySelectorAll(".white-click");
const black = document.querySelectorAll(".black-click");
const all = document.body;

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



