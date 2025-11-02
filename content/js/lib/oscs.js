/**
 * Overly Simplified Caching Strategy Beta Version 2
 * Copyright Joseph Morukhuladi 2025 MIT LICENSE
 */
const OSCS = {
    version: 1,
    styles() {
        let links = document.querySelectorAll("link[oscs]");
        links.forEach(link => {
            link.removeAttribute("oscs");
            let cloneLink = link.cloneNode(true);
            cloneLink.href = OSCS.appendVersion(cloneLink.href);
            link.after(cloneLink);
        });
    },
    scripts(target, scripts) {
        if (scripts.length > 0) OSCS.createScript(target, 0, scripts)
    },
    createScript(target, index, scripts) {
        let targeEl = document.querySelector(target);
        let el = document.createElement("script");
        let file = scripts[index];
        el.src = OSCS.appendVersion(file.path);
        if (file.async) el.async = file.async;
        if (file.defer) el.defer = file.defer;
        if (file.fetchpriority) el.fetchPriority = file.fetchpriority;
        el.onload = function() {
            let hasNext = typeof(scripts[index + 1]) !== 'undefined';
            if (hasNext) OSCS.createScript(target, index + 1, scripts);
        }
        targeEl.appendChild(el);
    },
    appendVersion(path) {
        return `${path}?v=${OSCS.version}`;
    }
}