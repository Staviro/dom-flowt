DOMFlowt.defaults.duration = 1000;

document.querySelector(".main-body").addEventListener("scroll", function() {
    DOMFlowt.watch();
});

document.querySelector(".menu").addEventListener("scroll", function() {
    DOMFlowt.watch();
});

window.addEventListener("scroll", function() {
    DOMFlowt.watch();
});

window.addEventListener("load", function() {
    DOMFlowt.watch();
});


function openMenu() {
    document.querySelector(".main-side").style.display = "block";
    DOMFlowt.watch();
}

function closeMenu() {
    let sideMain = document.querySelector(".main-side").style.display;
    if (sideMain == "block") {
        document.querySelector(".main-side").style.display = "none";
    }
}

function openModal(selector) {
    document.querySelector(selector).style.display = "flex";
}

function closeModal(selector) {
    document.querySelector(selector).style.display = "none";
}