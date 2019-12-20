const button = document.querySelectorAll(".click");
const edge = document.querySelector(".edge");
const slider = document.getElementById("slide");
const right = document.querySelector(".slide1")
const cursor = document.querySelector(".cursor")
const all = document.body

window.onmousemove = (e) => {
    let x = e.clientX;
    let y = e.clientY
    cursor.style.left = x + "px"
    cursor.style.top = y + "px"
}

const addSlideEventListener = () => {
    edge.addEventListener("mousedown", slide)
}

const removeSlideEventListener = () => {
    button.forEach(item => { item.innerHTML = "Drag the edge and explore" });
    window.onmousemove = (e) => {
        cursor.style.display = "inline"
        let x = e.clientX;
        let y = e.clientY
        cursor.style.left = x + "px"
        cursor.style.top = y + "px"
    }
    addSlideEventListener();

}
const slide = (event) => {
    cursor.style.display = "none"
    event.preventDefault();
    button.forEach(item => { item.innerHTML = "<span><</span>Slide<span>></span>"; });
    window.onmousemove = (e) => {
        let x = e.clientX;
        slider.style.left = x + "px"
    }
    all.addEventListener("mouseup", removeSlideEventListener, true)
}
const cursorShow = () => { cursor.style.display = "inline" }
const cursorHide = () => { cursor.style.display = "none" }
const cursorColorChange = (color, borderColor) => {
    cursor.style.background = color
    cursor.style.border = `1px solid ${borderColor}`
}