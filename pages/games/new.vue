<template>
  <div>
    <top-header title="New game" />

    <div class="page-content">
      <form class="form" @submit.prevent="submit">

        <v-text-field
          label="Name"
          v-model="form.name"
          outlined
          color="secondary"
        />

        <v-textarea
          v-model="form.instructions"
          label="Instructions"
          outlined
          color="secondary"
        />

        <div class="selection">
          <div class="selection__header">
            <h3>
              Subjects
            </h3>
            
            <v-btn class="selection__header__plus" fab x-small color="secondary" @click="openSelectorPrompt('subjects')">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </div>

          <div class="selection__chips">
            <template v-for="s in subjects">
              <v-chip :key="s" class="selection__chips__chip" :color="isSelected('subjects', s) ? 'secondary': 'gray'"  @click="select('subjects', s)">
                {{s}}
                <v-icon right small>{{isSelected('subjects', s) ? 'mdi-minus' : 'mdi-plus'}}</v-icon>
              </v-chip>
            </template>
          </div>
        </div>

        <div>
          <h3>Number of photos: {{form.numberOfPhotos}}</h3>


          <v-slider
            v-model="form.numberOfPhotos"
            min="1"
            max="5"
            :thumb-size="20"
            outlined
            color="secondary"
          />

        </div>

        <div class="selection">
          <div class="selection__header">
            <h3>
              Categories
            </h3>
            
            <v-btn class="selection__header__plus" fab x-small color="secondary" @click="openSelectorPrompt('categories')">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </div>

          <div class="selection__chips">
            <template v-for="c in categories">
              <v-chip :key="c" class="selection__chips__chip" :color="isSelected('categories', c) ? 'secondary': 'gray'"  @click="select('categories', c)">
                {{c}}
                <v-icon right small>{{isSelected('categories', c) ? 'mdi-minus' : 'mdi-plus'}}</v-icon>
              </v-chip>
            </template>
          </div>
        </div>

        <div class="form__actions">
          <v-spacer></v-spacer>
        
          <v-btn @click="clear" text>
            Clear
          </v-btn>   
          
          <v-btn type="submit" color="primary">
            Start
          </v-btn>              
        </div>

      </form>

    <v-dialog v-model="newSelectorPrompt" persistent max-width="550px">
      <v-card>
        <v-card-title class="headline">Add something new to {{newSelectorKey}}?</v-card-title>

        <form @submit.prevent="addNewSelection">
          <v-card-text>
            <v-text-field
              label="Category"
              v-model="newSelector"
              outlined
              color="secondary"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="newSelectorPrompt = false">Cancel</v-btn>
            <v-btn color="secondary" type="submit">Add</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

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
        subjects: [],
        categories: []
      },

      subjects: [
        'Free for all',
        'People',
        'Landscape',
        'Animal'
      ],

      categories: [
        'Composition',
        'DIY Filter',
        'Creativity',
        'Difficulty',
        'Likeliness to go viral'
      ],

      newSelector: null,
      newSelectorKey: null,
      newSelectorPrompt: false,
    }
  },

  methods: {
    clear() {
      this.form = {
        numberOfPhotos: 3,
        subjects: [],
        categories: []
      }
    },

    select(k, v) {
      this.isSelected(k, v) ? 
        this.form[k] = this.form[k].filter(c => c !== v) : this.form[k].push(v);
    },

    isSelected(k, v) {
      return this.form[k].filter(d => d.toLowerCase() === v.toLowerCase()).length >= 1;
    },

    isCurrentSelectionOption(k, v) {
      return this[k].filter(d => d.toLowerCase() === v.toLowerCase()).length >= 1;
    },

    openSelectorPrompt(key) {
      this.newSelectorKey = key;
      this.newSelector = null
      this.newSelectorPrompt = true;
    },

    addNewSelection() {
      const key = this.newSelectorKey;

      if (this.isCurrentSelectionOption(key, this.newSelector)) {
        if (!this.isSelected(key, this.newSelector)) this.form.categories.push(this.newSelector);
        this.newSelectorPrompt = false;
        return;
      }

      this.form[key].push(this.newSelector);
      this[key].push(this.newSelector);

      this.newSelectorPrompt = false;
      this.newSelectorKey = null;
      this.newSelector = null;
    },

    async submit() {
      const { data } = await this.$axios.post(`http://localhost:3000/api/games`, this.form)
      this.$router.push({ path: `/games/${data[0].id}` })
    }
  },

  components: {
    TopHeader
  }    
}
</script>

<style lang="scss" scoped>
  .form {
    width: 100%;

    .form__actions {
      display: flex
    }
  }

  .selection {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .selection__header {
      display: flex;

      .selection__header__plus {
        margin-left: 11px;
      }
    }

    .selection__chips {
      display: flex;
      flex-wrap: wrap;
      margin-top: 11px;
      margin-bottom: 11px;

      .selection__chips__chip {
        margin: 5.5px;
      }
      
    }
  }
</style>