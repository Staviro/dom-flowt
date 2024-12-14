const RENDER = {
    shopItems(target) {
        let shopItemsContainer = document.querySelector(target);
        shopItemsContainer.innerHTML = null;
        DATA.forEach(function(item) {
            let shopItem = document.createElement('div');
            shopItem.id = `shop-item-${item.id}`;
            shopItem.className = "shop-item";
            shopItem.setAttribute('dom-flowt-is-visible', 'false');
            shopItem.setAttribute('dom-flowt-duration', 1000);
            shopItem.setAttribute('dom-flowt-type', 'pop-down');
            shopItem.innerHTML = HTML_SHOP.shopItem()
            .replaceAll("##name##", item.name)
            .replaceAll("##price##", item.price.toLocaleString('en'))
            .replaceAll("##image##", item.imageUrl)
            .replaceAll("##category##", item.category);
            shopItemsContainer.appendChild(shopItem);
        });
    }
}