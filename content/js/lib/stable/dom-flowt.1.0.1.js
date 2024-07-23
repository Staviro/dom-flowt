const DOM_FLOWT = {
    defaults: {
        type: "fade",
        duration: 500
    },
    isOnScreen: function(el) {
        let elPosition = el.getBoundingClientRect();
        let result = window.innerHeight - elPosition.y;
        let isOnScreen = result > 0 && result < (window.innerHeight + elPosition.height);
        if (isOnScreen) {
            DOM_FLOWT.applyAnimation(el);
        }
    },
    getFlowtAttributes(el) {
        let _type = DOM_FLOWT.isEmpty(el.getAttribute("dom-flowt-type"), DOM_FLOWT.defaults.type);
        let _duration = DOM_FLOWT.isEmpty(Number(el.getAttribute("dom-flowt-duration")), DOM_FLOWT.defaults.duration);
        return {
            type: _type,
            duration: _duration
        }
    },
    isEmpty(val, alt) {
        let result = val;
        if (val == "" || val == null || typeof(val) == "undefined"  || val == 0) {
            result = alt;
        }
        return result;
    },
    hiddenFlowtElements() {
        let flowtElements = document.querySelectorAll('[dom-flowt-is-visible="false"]');
        for (el of flowtElements) {
            this.isOnScreen(el);
        }
    },
    applyAnimation(el) {
        let config = DOM_FLOWT.getFlowtAttributes(el);
        let cls = "dom-flowt-" + config.type;
        el.setAttribute("dom-flowt-is-visible", "true");
        el.classList.add(cls);
        el.style.animationDuration = config.duration + "ms";
        el.classList.remove("dom-flowt-hidden");
        setTimeout(function() {
            el.classList.remove(cls);
            el.style.animationDuration = null;
        }, config.duration + 350);
    },
    checkForNewOnScreenElements() {
        DOM_FLOWT.hiddenFlowtElements();
    }
}