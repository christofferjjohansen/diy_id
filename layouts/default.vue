<template>
  <v-app id="app" light>
    <nav class="nav-global">
      <v-btn fab small nuxt to="/" text>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn  nuxt to="/games/join" text rounded>
        Join game
      </v-btn>
      
      <v-btn  nuxt to="/games/new" text rounded>
        New game
      </v-btn>
        
      <v-btn nuxt to='/about' text rounded>
        About
      </v-btn>
    </nav>

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
    margin: 0 auto;
    padding: 33px;
  }

  .nav-global {
    height: 69px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px;
    position: absolute;
    z-index: 2;
    width: 100%;
  }
</style>
