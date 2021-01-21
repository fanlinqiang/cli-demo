<template lang="pug">
#app
    #nav
        router-link(to="/") Home
        router-link(to="about") About
        img(:src="`${$baseUrl}favicon.ico`")
</template>
<script>
export default {
    created () {

    }
}
</script>
<style lang="sass" scoped>
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
#nav
  padding: 30px
  background: $color-primary url($baseUrl + 'favicon.ico') no-repeat
  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983
</style>
