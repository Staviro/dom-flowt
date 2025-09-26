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
        let el = document.querySelector(target);
        scripts.forEach(script => {
            el.appendChild(OSCS.createScript(script));
        })
    },
    createScript(file) {
        let el = document.createElement("script");
        el.src = OSCS.appendVersion(file.path);
        if (file.defer) el.defer = file.defer;
        if (file.fetchpriority) el.fetchPriority = file.fetchpriority;
        return el;
    },
    appendVersion(path) {
        return `${path}?v=${OSCS.version}`;
    }
}