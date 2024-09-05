document.onscroll = function() {
    DOMFlowt.checkForNewOnScreenElements();
}

window.onload = function() {
    DOMFlowt.checkForNewOnScreenElements();
}

function openMobileMenu() {
    document.getElementById('mobile-menu').style.display = "block";
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').style.display = "none";
}