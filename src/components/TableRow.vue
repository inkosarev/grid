<template lang="pug">
    tr
        td(v-for='field of order') {{ field }}
</template>

<script>
export default {
    name: 'TableRow',
    props: ['order']
}
</script>

<style lang="sass">

</style>
