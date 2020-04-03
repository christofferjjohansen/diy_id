<template>
  <v-app id="app" light>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'DIY IG'
    }
  }
}
</script>

<style lang="scss">
  .page-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1100px;
    margin-top: 33px;
    padding: 33px;
  }
</style>
