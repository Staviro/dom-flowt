['.shop-items-latest', '.shop-items-new', '.shop-items-limited-offers'].forEach(function(s) {
    RENDER.shopItems(s);
});

window.addEventListener('load', function() {
    DomFlowt.watch();
    this.window.addEventListener('scroll', function() {
        DomFlowt.watch();
    })
})