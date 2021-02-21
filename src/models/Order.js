import OrderItem from './OrderItem'

export default class Order {
    buyer
    create_date
    is_paid
    is_shipped
    order_id
    total_price
    items

    /**
     * Возвращает массив заголовков для таблицы
     * @returns Array<String>
     * */
    static getRowHeader() {
        return [
            'ID',
            'Товары',
            'Дата заказа',
            'Оплачено',
            'Доставлено',
            'Покупатель',
            'Стоимость',
        ]
    }

    /**
     * Возвращает простые поля заказа
     * @returns Object
     * */
    getRowFields() {
        return {
            order_id: this.order_id,
            count: this.items.length,
            create_date: this.create_date,
            is_paid: this.is_paid,
            is_shipped: this.is_shipped,
            buyer: this.buyer,
            total_price: this.total_price
        }
    }

    constructor(order) {
        this.create_date = order.create_date
        this.is_paid = order.is_paid
        this.is_shipped = order.is_shipped
        this.order_id = order.order_id
        this.total_price = order.total_price
        this.buyer = order.buyer
        this.items = order.items ? order.items.map(item => {
            return new OrderItem(item)
        }) : []
    }
}
