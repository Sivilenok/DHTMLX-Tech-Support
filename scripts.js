let dragItem = document.querySelector("#drag-item");
let container = document.querySelector("#drag-field");
let yInput = document.getElementById('top');
let xInput = document.getElementById('left');

let dragItemWidth = dragItem.clientWidth;
let dragItemHeight = dragItem.clientHeight;
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;

let minX = 0;
let minY = 0;
let maxX = containerWidth - dragItemWidth;
let maxY = containerHeight - dragItemHeight;

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener("touchstart", dragStart);
container.addEventListener("touchend", dragEnd);
container.addEventListener("touchmove", drag);

container.addEventListener("mousedown", dragStart);
container.addEventListener("mouseup", dragEnd);
container.addEventListener("mousemove", drag);

setCoordinates(yOffset, xOffset);

xInput.addEventListener("change", setPosition);
yInput.addEventListener("change", setPosition);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        if (validPosition(currentX, currentY)) {
            setOffset(currentX, currentY);
            setTranslate(currentX, currentY, dragItem);
            setCoordinates(currentY, currentX)
        } else {
            currentX = xOffset;
            currentY = yOffset;

            let event = new MouseEvent('mouseup', {
                view: window
            });

            container.dispatchEvent(event);
        }
    }
}

function setPosition() {
    currentX = xInput.value;
    currentY = yInput.value;

    setOffset(currentX, currentY);
    setTranslate(currentX, currentY, dragItem)
}

function setOffset(x, y) {
    xOffset = x;
    yOffset = y;
}

function setCoordinates(top, left) {
    yInput.value = top;
    xInput.value = left;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function validPosition(x, y) {
    if (x < minX || x > maxX || y < minY || y > maxY) {
        return false;
    }

    return true;
}