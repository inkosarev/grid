export default class Order {
    buyer
    create_date
    is_paid
    is_shipped
    order_id
    total_price
    items

    constructor(order) {
        this.buyer = order.buyer
        this.create_date = order.create_date
        this.is_paid = order.is_paid
        this.is_shipped = order.is_shipped
        this.order_id = order.order_id
        this.total_price = order.total_price
        this.buyer = order.buyer
        this.items = order.items
    }
}
