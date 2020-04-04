<template>
  <header>
    <!-- <v-btn class="back-button" v-if="showBackButton" small fab color="secondary" @click="back">
      <v-icon small>mdi-arrow-left</v-icon>
    </v-btn> -->

    <h1>
      {{title}}
    </h1>
  </header>
</template>

<script>
  export default {
    props: ['title'],

    data() {
      return {
        backButtonPaths: [
          'about',
          'new'
        ]
      }
    },

    computed: {
      showBackButton() {
        return this.backButtonPaths.includes(this.$route.name)
      }
    },

    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('~assets/ig.jpg');
    background-size: cover;

    h1 {
      color: white;
      font-size: 48px;
    }

    .back-button {
      margin-bottom: 11px;
    }
  } 
</style>