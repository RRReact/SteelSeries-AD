const text = document.querySelectorAll(".click");
const edge = document.querySelector(".edge");
const slider = document.getElementById("slide");
const right = document.querySelector(".slide1")
const left = document.querySelector(".slide2")
const cursor = document.querySelector(".cursor")
const all = document.body

right.addEventListener("mouseenter", () => cursorColorChange("white", "black"));
left.addEventListener("mouseenter", () => cursorColorChange("black", "white"));
edge.addEventListener("mousedown", () => drag(event));
window.onmousemove = (e) => {
    let x = e.clientX;
    let y = e.clientY
    cursor.style.left = x + "px"
    cursor.style.top = y + "px"
}


const removeDragEventListener = () => {
    text.forEach(item => { item.innerHTML = "Drag the edge and explore" });
    window.onmousemove = (e) => {
        cursor.style.display = "inline"
        let x = e.clientX;
        let y = e.clientY
        cursor.style.left = x + "px"
        cursor.style.top = y + "px"
    }
}
const drag = (event) => {
    cursor.style.display = "none"
    event.preventDefault();
    text.forEach(item => { item.innerHTML = "<span><</span>Drag<span>></span>"; });
    window.onmousemove = (e) => {
        let x = e.clientX;
        slider.style.left = x + "px"
    }
    all.addEventListener("mouseup", removeDragEventListener, true)
}
const cursorShow = () => { cursor.style.display = "inline" }
const cursorHide = () => { cursor.style.display = "none" }
const cursorColorChange = (color, borderColor) => {
    cursor.style.backgroundColor = color
    cursor.style.border = `1px solid ${borderColor}`
}
all.addEventListener("mouseenter", cursorShow);
