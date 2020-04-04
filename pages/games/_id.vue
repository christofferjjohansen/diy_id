<template>
  <div>
    <top-header :title="game && game.name ? game.name : 'Loading...'" />

    <div class="page-content">

      <div class="loading" v-if="!loaded">
         <v-progress-circular :value="100" color="primary" indeterminate />
      </div>

      <div class="loaded" v-if="loaded">
        <form class="form" @submit.prevent="submit">
          <div class="team-name">
            <h2>Team</h2>

            <v-text-field
              label="Name"
              v-model="form.name"
              outlined
              color="secondary"
            />
          </div>

          <div class="categories">
            <h2>Categories</h2>

            <div class="categories__chips">
              <template v-for="c in game.categories">
                <v-chip :key="c" class="categories__chips__chip" color="secondary">
                  {{c}}
                </v-chip>
              </template>
            </div>
          </div>

          <div class="submissions">
            <h2>
              Submissions
            </h2>

            <template v-for="(s, i) in game.number_of_photos">
              <div :key="i">
                <h3>#{{i+1}}</h3>

                <v-file-input
                  label="Upload image" 
                  outlined
                  color="secondary"
                  v-model="form[`submission_${i+1}`].image"
                />

                <v-textarea
                  v-model="form[`submission_${i+1}`].note"
                  label="Add any notes you want for the judges"
                  outlined
                  color="secondary"
                />

                <v-divider class="mb-6"></v-divider>
              </div>
            </template>
          </div>

          <div class="form__actions">
            <v-spacer></v-spacer>
          
            <v-btn text @click="clear">
              Clear
            </v-btn>   
            
            <v-btn type="submit" color="primary">
              Submit
            </v-btn>              
          </div>

        </form>
      </div>
      
    </div>

    <pre>
      {{form}}
    </pre>

    <pre>
      {{game}}
    </pre>
  </div>
</template>

<script>
import TopHeader from '~/components/top_header'

export default {
  data() {
    return {
      game: null,
      form: {}
    }
  },

  computed: {
    loaded() {
      return this.game;
    },
  },

  async created() {
    try {
      const { data } = await this.$axios.get(`http://localhost:3000/api/games/${this.$route.params.id}`)
      this.form = this.createFormObject(data)
      this.game = data

    } catch (error) {
      debugger
    }
  },  

  methods: {
    createFormObject({ number_of_photos }) {
      const form = { name: null }
      for (let i = 1; i <= number_of_photos; i++) { form[`submission_${i}`] = { image: null, note: null } }
      return form
    },

    submit() {
      console.log(this.form)
    },

    clear() {
      this.form = this.createFormObject(this.game)
    }
  },

  components: {
    TopHeader
  }
}
</script>

<style lang="scss" scoped>
  .loaded {
    width: 100%;
  }
  
  .form {
    width: 100%;

    .form__actions {
      display: flex
    }
  }


  .categories {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .categories__header {
      display: flex;

      .categories__header__plus {
        margin-left: 11px;
      }
    }

    .categories__chips {
      display: flex;
      flex-wrap: wrap;
      margin-top: 11px;
      margin-bottom: 11px;

      .categories__chips__chip {
        margin: 5.5px;
      }
      
    }
  }
</style>