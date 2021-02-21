export default class OrderItem {
    currency
    id
    main_image
    price
    quantity
    sku
    title
    total_price

    static getRowItemsHeader() {
        return [
            'Название/SKU',
            'Заказанное количество',
            'Отправленное количество',
            'Цена',
            'Стоиомсть'
        ]
    }

    constructor(order_item) {
        this.currency = order_item.currency
        this.id = order_item.id
        this.main_image = order_item.main_image
        this.price = order_item.price
        this.quantity = order_item.quantity
        this.sku = order_item.sku
        this.title = order_item.title
        this.total_price = order_item.total_price
    }
}
