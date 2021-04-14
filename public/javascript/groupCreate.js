function drag(ev) {
    console.log("dragging");
    ev.dataTransfer.setData("text", ev.target.id);
}

function drover(ev) {
    ev.preventDefault();
}

function previewFile() {
const preview = document.querySelector('img');
const file = document.querySelector('input[type=file]').files[0];
const reader = new FileReader();

reader.addEventListener("load", function () {
// convert image file to base64 string
preview.src = reader.result;
}, false);

if (file) {
reader.readAsDataURL(file);
}
}