/**
 * Overly Simplified Caching Strategy Beta Version 1
 * Copyright Joseph Morukhuladi 2025 MIT LICENSE
 */
const OSCS = {
    version: 1,
    styles(target) {
        let el = document.querySelector(target);
        let links = el.querySelectorAll("link[oscs]");
        links.forEach(link => {
            link.href = OSCS.appendVersion(link.href);
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