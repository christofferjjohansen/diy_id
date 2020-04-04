<template>
  <div>
    <top-header title="Join games" />

    <div class="page-content">
      <div class="games">
        <template v-if="games">
          <v-card class="games__card" v-for="game in games" :key="game.id">
            <v-card-title>{{game.name}}</v-card-title>

            <v-card-subtitle class="pb-0">{{game.starts_at || 'No start date'}} - {{game.ends_at || 'No end date'}}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div class="games__categories__chips">
                <template v-for="c in game.categories">
                  <v-chip :key="c" class="games__categories__chips__chip" color="secondary">
                    {{c}}
                  </v-chip>
                </template>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" nuxt :to="`/games/${game.id}`">Join</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </div>
    </div>
    <pre>
      {{games}}  
    </pre>
  </div>
</template>

<script>
import TopHeader from "~/components/top_header";

export default {
  data() {
    return {
      games: undefined
    };
  },

  async created() {
    try {
      const { data } = await this.$axios.get("http://localhost:3000/api/games");
      this.games = data;
    } catch (error) {}
  },

  components: {
    TopHeader
  }
};
</script>

<style lang="scss" scoped>
.games {
  width: 100%;

  .games__card {
    margin: 22px;
  }

   .games__categories__chips {
    display: flex;
    flex-wrap: wrap;
    margin-top: 11px;
    margin-bottom: 11px;

    .games__categories__chips__chip {
      margin: 5.5px;
    }
    
  }
}
</style>