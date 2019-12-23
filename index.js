const text = document.querySelectorAll(".click");
const edge = document.querySelector(".edge");
const slider = document.getElementById("slide");
const right = document.querySelector(".slide1");
const left = document.querySelector(".slide2");
const all = document.body;
const colors = document.querySelectorAll(".colors")
const white = document.querySelectorAll(".whiteClick")
const black = document.querySelectorAll(".blackClick")


edge.addEventListener("mousedown", () => drag(event));
edge.addEventListener("mousedown", () => drag(event));

white.forEach(item => { item.addEventListener("click", () => blackOrWhite("white")) })
black.forEach(item => { item.addEventListener("click", () => blackOrWhite("black")) })

const removeDragEventListener = () => {
    text.forEach(item => { item.innerHTML = "Drag the edge and explore" });
    window.onmousemove = null
}
const drag = (event) => {
    event.preventDefault();
    text.forEach(item => { item.innerHTML = "<span><</span>Drag<span>></span>"; });
    window.onmousemove = (e) => {
        let x = e.clientX;
        slider.style.left = x + "px"
    }
    all.addEventListener("mouseup", removeDragEventListener, true)
}

const blackOrWhite = (color) => {
    if (color === "white") {
        gsap.to(right, 1, { left: 0, ease: "power2.in" })
    } else if (color === "black") {
        gsap.to(right, 1, { left: window.innerWidth, ease: "power2.in" })
    }
}



