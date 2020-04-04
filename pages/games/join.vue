<template>
  <div>
    <top-header title="Join games" />

    <div class="page-content">
      <div class="games" v-if="loaded && games.length > 0">
        <v-card class="games__card" v-for="game in games" :key="game.id">
          <v-card-title>{{game.name}}</v-card-title>

          <v-card-subtitle class="pb-0">
            {{game.submissions_start_at || 'No start date'}} - {{game.submissions_end_at || 'No end date'}}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div class="games__categories__chips">
              <template v-for="c in game.subjects">
                <v-chip :key="c" class="games__categories__chips__chip" color="primary">
                  {{c}}
                </v-chip>
              </template>
            </div>

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

            <template v-if="isActiveGame(game.submissions_start_at, game.submissions_end_at)">
              <v-btn color="primary" nuxt :to="`/games/${game.id}`">Join</v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </div>

      <div v-else>
        <h2>No active games</h2>
      </div>
    </div>
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

  computed: {
    loaded() {
      return this.games
    },
  },

  async created() {
    try {
      const { data } = await this.$axios.get("http://localhost:3000/api/games");
      this.games = data;
    } catch (error) {}
  },

  methods: {
    isActiveGame(start, end) {
      const current = new Date().toISOString()
      debugger
      return start < current && current < end
    }
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