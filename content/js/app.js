DomFlowt.defaults.duration = 1000;

window.addEventListener("scroll", function() {
    DomFlowt.watch();
});

window.addEventListener("load", function() {
    DomFlowt.watch();

    document.querySelector(".main-body").addEventListener("scroll", function() {
        DomFlowt.watch();
    });
    
    document.querySelector(".menu").addEventListener("scroll", function() {
        DomFlowt.watch();
    });
});


function openMenu() {
    document.querySelector(".main-side").style.display = "block";
    DomFlowt.watch();
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