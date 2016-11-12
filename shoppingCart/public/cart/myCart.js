function MyCart() {
    this.clearCart = false;
    this.items = [];
    this.total = 0;
    // load items from local storage when initializing
    this.loadItems();

    // save items to local storage when unloading
    var self = this;
    $(window).unload(function () {
        if (self.clearCart) {
            self.clearItems();
        }
        self.saveItems();
        self.clearCart = false;
    });
}

// adds an item to the cart
MyCart.prototype.addItem = function (name, price, quantity) {
    //quantity = this.toNumber(quantity);
    if (quantity != 0) {

        // update quantity for existing item
        var found = false;
        var item;
        for (var i = 0; i < this.items.length && !found; i++) {
            item = this.items[i];
            if (item.name == name) {
                found = true;
                item.quantity = (item.quantity + quantity);
                if (item.quantity <= 0) {
                    //this.items.splice(i, 1);
                }
            }
        }

        // new item, add now
        if (!found) {
            item = new cartItem(name, price, quantity);
            this.items.push(item);
        }

        // save changes
        this.saveItems();
    }
}

MyCart.prototype.removeItem = function (name, price, quantity) {
    if (quantity != 0) {
        // update quantity for existing item
        var found = false;
        var item;
        for (var i = 0; i < this.items.length && !found; i++) {
            item = this.items[i];
            if (item.name == name) {
                found = true;
                item.quantity = (item.quantity - quantity);
                if(item.quantity <= 0){
                    this.items.splice(i, 1);
                }
            }
        }
        // save changes
        this.saveItems();
    }
    return found;
}

// items in the cart
//
function cartItem(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}


// load items from local storage
MyCart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
                    item = new cartItem(item.sku, item.name, item.price, item.quantity);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
};

// save items to local storage
MyCart.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
};