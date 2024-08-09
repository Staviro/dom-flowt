const DOM_FLOWT = {
    // @desc Setting default values if optional are not added to attributes
    defaults: {
        type: "fade",
        duration: 500
    },
    // @desc Function for checking if an element is visible on the screen
    isOnScreen: function(el) {
        let elPosition = el.getBoundingClientRect();
        let result = window.innerHeight - elPosition.y;
        let isOnScreen = result > 0 && result < (window.innerHeight + elPosition.height);
        if (isOnScreen) {
            DOM_FLOWT.applyAnimation(el);
        }
    },
    // @desc Function for getting dom flowt attibutes from an element
    getFlowtAttributes(el) {
        let _type = DOM_FLOWT.isEmpty(el.getAttribute("dom-flowt-type"), DOM_FLOWT.defaults.type);
        let _duration = DOM_FLOWT.isEmpty(Number(el.getAttribute("dom-flowt-duration")), DOM_FLOWT.defaults.duration);
        let _delay = DOM_FLOWT.isEmpty(Number(el.getAttribute("dom-flowt-delay")), 0);
        return {
            type: _type,
            duration: _duration,
            delay: _delay
        }
    },
    // @desc Function for checking if a dom flowt attribute has a value or not, if not the default configured value is applied.
    isEmpty(val, alt) {
        let result = val;
        if (val == "" || val == null || typeof(val) == "undefined"  || val == 0) {
            result = alt;
        }
        return result;
    },
    // @desc Function for getting all dom flowt elements that has not been transitioned yet
    hiddenFlowtElements() {
        let flowtElements = document.querySelectorAll('[dom-flowt-is-visible="false"]');
        for (let el of flowtElements) {
            this.isOnScreen(el);
        }
    },
    // @desc Function for applying an animation when element is visible on the screen
    applyAnimation(el) {
        let config = DOM_FLOWT.getFlowtAttributes(el);
        console.log("config:", config);
        if (config.delay > 0) {
            setTimeout(() => {
                DOM_FLOWT.animate(config, el);
            }, config.delay);
        } else {
            DOM_FLOWT.animate(config, el);
            console.log('no delay');
        }
        /*let cls = "dom-flowt-" + config.type;
        el.setAttribute("dom-flowt-is-visible", "true");
        el.classList.add(cls);
        el.style.animationDuration = config.duration + "ms";
        el.classList.remove("dom-flowt-hidden");
        setTimeout(function() {
            el.classList.remove(cls);
            el.style.animationDuration = null;
        }, config.duration + 350);*/
    },
    // @desc Function that applies animation to an element
    animate(config, el) {
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
    // @desc Function that checks for hidden dom flowt elements and displays them when they come into the users screen
    checkForNewOnScreenElements() {
        DOM_FLOWT.hiddenFlowtElements();
    }
}