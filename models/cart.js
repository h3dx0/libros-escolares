var cart = function Cart(oldCart) {
    //items son los grupos de productos
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        //asignamos lo q hay en items con el id del producto q buscamos
        storeItem = this.items[id];
        if (!storeItem) {
            storeItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storeItem.qty++;
        //asignamos el precio del item y la cantidad al grupo de productos
        storeItem.price = storeItem.item.price * storeItem.qty;
        this.totalQty++;
        this.totalPrice += storeItem.price;
    };
    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};

module.exports = cart;