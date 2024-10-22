'use strict'

/*!
    *Malo
    *(c) 2024 Joseph Morukhuladi
    *Licensed under MIT (https://github.com/Staviro/dom-flowt/blob/main/License.txt)
*/

const DomFlowt = {
    defaults: { type: "fade", duration: 500, repeat: "repeat", },
    attributes: { type: "dom-flowt-type", duration: "dom-flowt-duration", delay: "dom-flowt-delay", repeat: "dom-flowt-repeat", visible : "dom-flowt-is-visible" },
    isOnScreen: function(el) {
        let pos = el.getBoundingClientRect();
        let result = window.innerHeight - pos.y;
        let isOnScreen = result > 0 && result < (window.innerHeight + pos.height);
        if (isOnScreen) { DomFlowt.applyAnimation(el);}
        else { DomFlowt.resetState(el); }
    },
    getFlowtAttributes(el) {
        let _type = DomFlowt.isEmpty(el.getAttribute(DomFlowt.attributes.type), DomFlowt.defaults.type);
        let _duration = DomFlowt.isEmpty(Number(el.getAttribute(DomFlowt.attributes.duration)), DomFlowt.defaults.duration);
        let _delay = DomFlowt.isEmpty(Number(el.getAttribute(DomFlowt.attributes.delay)), 0);
        let _repeat = DomFlowt.isEmpty(el.getAttribute(DomFlowt.attributes.repeat), DomFlowt.defaults.repeat);
        return { type: _type, duration: _duration, delay: _delay, repeat: _repeat }
    },
    isEmpty(val, alt) {
        let result = val;
        if (val === "" || val == null || typeof(val) === "undefined"  || val === 0) { result = alt; }
        return result;
    },
    flowtElements() {
        let flowtElements = document.querySelectorAll(`[${DomFlowt.attributes.visible}]`);
        for (let el of flowtElements) { this.isOnScreen(el); }
    },
    applyAnimation(el) {
        let config = DomFlowt.getFlowtAttributes(el);
        if (config.delay > 0) { setTimeout(() => { DomFlowt.animate(config, el); }, config.delay); }
        else { DomFlowt.animate(config, el); }
    },
    resetState(el) {
        let config = DomFlowt.getFlowtAttributes(el);
        if (config.repeat === DomFlowt.defaults.repeat) {
            let val = el.getAttribute(DomFlowt.attributes.visible);
            if (val === "true") el.setAttribute(DomFlowt.attributes.visible, "false");
        }
    },
    animate(config, el) {
        let cls = "dom-flowt-" + config.type;
        let val = el.getAttribute(DomFlowt.attributes.visible);
        if (val === "false") {
            el.setAttribute(DomFlowt.attributes.visible, "true");
            el.classList.add(cls);
            el.style.animationDuration = config.duration + "ms";
            function onEnd() { el.classList.remove(cls); el.style.animationDuration = null; }
            el.addEventListener("animationend", function() { onEnd(); el.removeEventListener("animationend", onEnd); });
        }
    },
    watch() { DomFlowt.flowtElements(); }
}