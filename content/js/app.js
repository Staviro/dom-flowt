document.onscroll = function() {
    DOM_FLOWT.checkForNewOnScreenElements();
}

window.onload = function() {
    DOM_FLOWT.checkForNewOnScreenElements();
}

function openMobileMenu() {
    document.getElementById('mobile-menu').style.display = "block";
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').style.display = "none";
}