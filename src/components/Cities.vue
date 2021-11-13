<template>
  <div class="cities">
    <div v-for="(city, i) in cities" :key="i" class="cities__item">
      <city :city="city" />
    </div>
  </div>
</template>

<script>
import City from './City.vue'
export default {
  components: { City },
  name: 'Cities',
  computed: {
    cities () {
      return this.$store.getters.cities
    }
  }
}
</script>

<style lang="scss">
  .cities {
    width: 100%;
    margin-top: 80px;
    margin-bottom: 34px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &__item {
      margin: 20px;
    }
  }
</style>
