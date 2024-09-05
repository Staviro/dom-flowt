const DOMFlowt = {
    defaults: { type: "fade", duration: 500, repeat: "repeat", },
    attributes: { type: "dom-flowt-type", duration: "dom-flowt-type", delay: "dom-flowt-delay", repeat: "dom-flowt-repeat", visible : "dom-flowt-is-visible" },
    isOnScreen: function(el) {
        let elPosition = el.getBoundingClientRect();
        let result = window.innerHeight - elPosition.y;
        let isOnScreen = result > 0 && result < (window.innerHeight + elPosition.height);
        if (isOnScreen) { DOMFlowt.applyAnimation(el);} 
        else { DOMFlowt.resetState(el); }
    },
    getFlowtAttributes(el) {
        let _type = DOMFlowt.isEmpty(el.getAttribute(DOMFlowt.attributes.type), DOMFlowt.defaults.type);
        let _duration = DOMFlowt.isEmpty(Number(el.getAttribute(DOMFlowt.attributes.duration)), DOMFlowt.defaults.duration);
        let _delay = DOMFlowt.isEmpty(Number(el.getAttribute(DOMFlowt.attributes.delay)), 0);
        let _repeat = DOMFlowt.isEmpty(el.getAttribute(DOMFlowt.attributes.repeat), DOMFlowt.defaults.repeat);
        return { type: _type, duration: _duration, delay: _delay, repeat: _repeat }
    },
    isEmpty(val, alt) {
        let result = val;
        if (val == "" || val == null || typeof(val) == "undefined"  || val == 0) { result = alt; }
        return result;
    },
    hiddenFlowtElements() {
        let flowtElements = document.querySelectorAll(`[${DOMFlowt.attributes.visible}]`);
        for (let el of flowtElements) { this.isOnScreen(el); }
    },
    applyAnimation(el) {
        let config = DOMFlowt.getFlowtAttributes(el);
        if (config.delay > 0) { setTimeout(() => { DOMFlowt.animate(config, el); }, config.delay); } 
        else { DOMFlowt.animate(config, el); }
    },
    resetState(el) {
        let config = DOMFlowt.getFlowtAttributes(el);
        if (config.repeat == DOMFlowt.defaults.repeat) {
            let val = el.getAttribute(DOMFlowt.attributes.visible);
            if (val == "true") el.setAttribute(DOMFlowt.attributes.visible, "false");
        } 
    },
    animate(config, el) {
        let cls = "dom-flowt-" + config.type;
        let val = el.getAttribute(DOMFlowt.attributes.visible);
        if (val == "false") {
            el.setAttribute(DOMFlowt.attributes.visible, "true");
            el.classList.add(cls);
            el.style.animationDuration = config.duration + "ms";
            function onEnd() { el.classList.remove(cls); el.style.animationDuration = null; }
            el.addEventListener("animationend", function() { onEnd(); removeEventListener("animationend", onEnd); });
        }
    },
    checkForNewOnScreenElements() { DOMFlowt.hiddenFlowtElements(); }
}