const HTML_SHOP = {
    shopItem() {
        return `
        <div class="shop-item-content">
            <div class="shop-item-header">
                <img src="##image##" height="230" alt="shop item"/>
            </div>
            <div class="shop-item-body">
                <div class="shop-item-name">##name##</div>
            </div>
            <div class="shop-item-footer">
                <button class="btn btn-item-price btn-white">R##price##</button>
            </div>
        </div>
        `
    }
}
