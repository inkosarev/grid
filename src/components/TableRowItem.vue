<template lang="pug">
    div

        img(:src='item.main_image || "https://via.placeholder.com/40"')
        div(class="td") {{ item.title }}
        div(class="td") {{ item.sku }}
        div(class="td") {{ item.quantity }}
        div(class="td") {{ item.price }}
        div(class="td") {{ item.total_price }}
</template>

<script>
export default {
    name: "TableRowItem",
    props: ['item']
}

</script>

<style lang="sass">
    .item-row
        background-color: red
</style>
