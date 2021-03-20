import OrderItem from './OrderItem'

/**
 * @class
 * @classdesc класс заказа
 */
export default class Order {
    /**
     * Идентификатор заказа
     * @type {String}
     */
    order_id

    /**
     * Заказчик
     * @type {String}
     */
    buyer

    /**
     * Дата создания заказа
     * @type {Date}
     */
    create_date

    /**
     * Статус оплаты заказа
     * @type {Boolean}
     */
    is_paid

    /**
     * Статус доставки заказа
     * @type {Boolean}
     */
    is_shipped

    /**
     * Общая стоимость заказа
     * @type {Number}
     */
    total_price

    /**
     * Позиции заказа
     * @type {Array<OrderItem>}
     */
    items

    /**
     * Возвращает массив заголовков для таблицы
     * @returns Array<String>
     */
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
     */
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

    /**
     * @constructs
     * @param {Object} order - объект заказа
     */
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
