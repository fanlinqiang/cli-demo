<template lang="pug">
#app
    | phone
    img(src="@/phone/assets/logo.png")
    router-view
</template>
<script>
export default {
    created () {
        this.$router.push({ name: 'hello' })
    }
}
</script>
<style lang="sass" scoped>
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: $primary-color
  font-size: 12px
</style>
