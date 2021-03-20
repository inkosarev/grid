/**
 * @class
 * @classdesc класс позиции заказа
 */
export default class OrderItem {
    /**
     * Идентификатор позиции заказа
     * @type {String}
     */
    id

    /**
     * Валюта заказа
     * @type {String}
     */
    currency

    /**
     * Изображение для строки позиции заказа
     * @type {String}
     */
    main_image

    /**
     * Цена
     * @type {String}
     */
    price

    /**
     * Количество
     * @type {String}
     */
    quantity

    /**
     *
     * @type {String}
     */
    sku

    /**
     * Название позиции заказа
     * @type {String}
     */
    title

    /**
     * Общая стоимость
     * @type {String}
     */
    total_price

    /**
     * Возвращает массив заголовков для позиций заказа
     * @returns Array<String>
     * */
    static getRowItemsHeader() {
        return [
            'Название/SKU',
            'Заказанное количество',
            'Цена',
            'Стоиомсть'
        ]
    }

    /**
     * @constructs
     * @param {Object} order_item - объект позиции заказа
     */
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
