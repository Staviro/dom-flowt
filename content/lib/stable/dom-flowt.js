"use strict";

/*!
 *Dom Flowt 2.1.0
 *(c) 2026 Joseph Morukhuladi
 *Licensed under MIT (https://github.com/Staviro/dom-flowt/blob/main/License.txt)
 */

const DomFlowt = {
  defaults: { type: "fade", repeat: "repeat", duration: 500 },
  attributes: {
    type: "dom-flowt-type",
    repeat: "dom-flowt-repeat",
    visible: "dom-flowt-is-visible",
    style: "dom-flowt-style",
    duration: "dom-flowt-duration",
  },
  isOnScreen: function (entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        DomFlowt.applyAnimation(entry.target);
      } else {
        DomFlowt.resetState(entry.target);
      }
    }
  },
  getFlowtAttributes(el) {
    let _type = DomFlowt.isEmpty(
      el.getAttribute(DomFlowt.attributes.type),
      DomFlowt.defaults.type,
    );
    let _repeat = DomFlowt.isEmpty(
      el.getAttribute(DomFlowt.attributes.repeat),
      DomFlowt.defaults.repeat,
    );
    let _style = DomFlowt.isEmpty(
      el.getAttribute(DomFlowt.attributes.style),
      null,
    );
    let _duration = DomFlowt.isEmpty(
      el.getAttribute(DomFlowt.attributes.duration),
      DomFlowt.defaults.duration,
    );
    return {
      type: _type,
      repeat: _repeat,
      style: _style,
      duration: _duration,
    };
  },
  isEmpty(val, alt) {
    let result = val;
    if (val === "" || val == null || typeof val === "undefined" || val === 0) {
      result = alt;
    }
    return result;
  },
  flowtElements() {
    let flowtElements = document.querySelectorAll(
      `[${DomFlowt.attributes.visible}]`,
    );

    const observer = new IntersectionObserver(this.isOnScreen);
    for (let el of flowtElements) {
      observer.observe(el);
    }
  },
  applyAnimation(el) {
    let config = DomFlowt.getFlowtAttributes(el);
    DomFlowt.animate(config, el);
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
    if (config.style) cls = `${cls}-${config.style}`;
    let val = el.getAttribute(DomFlowt.attributes.visible);
    if (val === "false") {
      el.setAttribute(DomFlowt.attributes.visible, "true");
      el.style.animationDuration = config.duration + "ms";
      el.classList.add(cls);
      function onEnd() {
        el.classList.remove(cls);
        el.style.animationDuration = null;
      }
      el.addEventListener("animationend", function () {
        onEnd();
        el.removeEventListener("animationend", onEnd);
      });
    }
  },
  watch() {
    DomFlowt.flowtElements();
  },
};
