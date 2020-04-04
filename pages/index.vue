<template>
  <div>
    <top-header title="DIY IG" />

    <div class="page-content">
      <v-btn color="primary" nuxt to="/games/new">
        Start a new game
      </v-btn>
    </div>
  </div>
</template>

<script>
import TopHeader from '~/components/top_header'

export default {
  components: {
    TopHeader
  }
}
</script>
