<template>
  <div id="app">
    <div class="container home">
      <h1 class="home__title">World Weather</h1>
      <cities />
      <div class="home__add">
        <md-button @click="isCreate = true" class="md-fab md-primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" fill-opacity="0.87"/>
          </svg>
        </md-button>
      </div>
    </div>
    <md-dialog :md-active.sync="isCreate">
      <city-create @close="isCreate = false" />
    </md-dialog>
  </div>
</template>

<script>
import Cities from './components/Cities.vue'
import CityCreate from './components/CityCreate.vue'

export default {
  name: 'App',
  components: { Cities, CityCreate },
  data () {
    return {
      isCreate: false
    }
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    align-items: center;
    flex-direction: column;

    &__title {
      font-weight: 300;
      font-size: 70px;
      line-height: 80px;
      color: #1B1B1B;
      margin: 24px 0 32px;
    }
    &__description {
      font-size: 24px;
      line-height: 24px;
      color: #767676;
      margin-bottom: 20px;
    }
    &__add {
      position: fixed;
      right: 34px;
      bottom: 34px;

      @media screen and (max-width: 720px) {
        position: relative;
        right: 0;
        bottom: 0;
        margin-bottom: 20px;
      }
    }
  }
</style>
