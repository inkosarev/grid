<template lang="pug">
    div
        tr(v-for='item of items')
            td(v-for='field of item') {{ field }}
</template>

<script>
export default {
    name: "TableRowItem",
    props: ['items'],
    created() {
        console.log(this.items)
    }
}

</script>

<style lang="sass">

</style>
