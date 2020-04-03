<template>
  <div>
    <top-header title="New game" />

    <div class="page-content">
      <form @submit.prevent="submit">

        <v-text-field
          label="Name"
          v-model="form.name"
          outlined
        />

        <v-textarea
          v-model="form.instructions"
          label="Instructions"
          outlined
        />

        <v-slider
          v-model="form.numberOfPhotos"
          label="Number of photos"
          min="1"
          max="5"
          thumb-label="always"
          :thumb-size="20"
          outlined
        />

        <div class="categories">
          <h3>
            Categories
          </h3>

          <div class="chips">
            <v-chip v-for="c in categories" :key="c" class="chip" :color="isSelected(c) ? 'primary': 'gray'"  @click="select(c)">
              {{c}}
              <v-icon right small>{{isSelected(c) ? 'mdi-minus' : 'mdi-plus'}}</v-icon>
            </v-chip>

            <v-btn color="secondary" rounded class="add-category">New category</v-btn>
          </div>
        </div>

        <v-btn @click="clear" text>
          Clear
        </v-btn>   
        
        <v-btn type="submit" color="primary">
          Create
        </v-btn>              

      </form>
    </div>


    <pre>
      {{form}}
    </pre>
    
  </div>
</template>

<script>
  import TopHeader from '~/components/top_header';

  export default {
    data() {
      return {
        form: {
          numberOfPhotos: 3,
          categories: [
            'Filter',
            'Viral'
          ]
        },

        categories: [
          'Composition',
          'Filter',
          'Creativity'
        ]
      }
    },

    methods: {
      clear() {
        this.form = {
          numberOfPhotos: 3
        }
      },

      select(v) {
        this.isSelected(v) ? 
          this.form.categories = this.form.categories.filter(c => c !== v) : this.form.categories.push(v)
      },

      isSelected(v) {
        return this.form.categories.filter(c => c === v).length >= 1
      }
    },

    components: {
      TopHeader
    }    
  }
</script>

<style lang="scss" scoped>
  form {
    width: 100%;
  }

  .categories {
    display: flex;
    flex-direction: column;
    margin: 16px auto;

    .chips {
      display: flex;
      margin-top: 16px;
      margin-bottom: 16px;

      .chip {
        margin: 0 5.5px;
      }
      
    }

    .add-category {
      
    }
  }
</style>