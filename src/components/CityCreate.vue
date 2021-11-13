<template>
    <div class="create">
        <form @submit.prevent="onSubmit">
            <md-field :class="{ 'md-invalid' : (isSubmitted && !$v.city.required) || (isSubmitted && isNotFound) || (isSubmitted && isExist) }">
                <label>Город</label>
                <md-input v-model.trim="$v.city.$model"></md-input>
                <span class="md-error">{{ isNotFound ? 'Город не найден' : isExist ? 'Уже существует' : 'Поле обязательно для заполнения' }}</span>
            </md-field>
            <div>
                <md-button type="submit" class="md-primary">Добавить</md-button>
                <md-button class="md-accent" @click="$emit('close')">Отмена</md-button>
            </div>
      </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { cityService } from '../_services/cityService'
import moment from 'moment'

export default {
  name: 'CityCreate',
  data () {
    return {
      city: '',
      isSubmitted: false,
      isNotFound: false,
      isExist: false
    }
  },
  validations: {
    city: {
      required
    }
  },
  computed: {
    cities () {
      return this.$store.getters.cities
    }
  },
  methods: {
    onSubmit (v) {
      this.isSubmitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        cityService.getData(this.city).then(res => {
          if (res.cod && res.cod === '404') {
            this.isNotFound = true
          } else {
            const c = this.cities.find(i => i.name === res.name)
            if (c) {
              this.isExist = true
            } else {
              this.$store.commit('create', {
                name: res.name,
                weather: res.weather.length ? res.weather[0].main : '',
                temperature: res.main.temp,
                humidity: res.main.humidity,
                country: res.sys.country,
                time: moment()
              })
              this.$toastr.s('Успешно создан')
              this.$emit('close')
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
    .create {
        min-width: 300px;
        padding: 20px;
    }
</style>
