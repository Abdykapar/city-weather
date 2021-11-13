<template>
  <md-card>
      <md-card-header>
        <div class="md-title">{{ city.name }}</div>
        <div class="md-subhead">{{city.country}}</div>
      </md-card-header>

      <md-card-content>
        <ul class="detail">
            <li class="detail__item">
                <span>Weather</span>
                <span>{{city.weather}}</span>
            </li>
            <li class="detail__item">
                <span>Temperature</span>
                <span>{{city.temperature}} °C</span>
            </li>
            <li class="detail__item">
                <span>Humidity</span>
                <span>{{city.humidity}} %</span>
            </li>
        </ul>
        <p class="detail-time">{{nowDate}}</p>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary" @click="remove">remove</md-button>
        <md-button class="md-primary" @click="reload">reload</md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
import moment from 'moment'
import { cityService } from '../_services/cityService'
export default {
  name: 'City',
  props: {
    city: { type: Object }
  },
  data () {
    return {
      nowDate: moment(this.city.time).fromNow(),
      interval: null
    }
  },
  computed: {
    getDate () {
      return moment(this.city.time).fromNow()
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.nowDate = moment(this.city.time).fromNow()
    }, 60000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    remove () {
      this.$store.commit('remove', this.city.name)
    },
    reload () {
      cityService.getData(this.city.name).then(res => {
        this.$store.commit('update', {
          name: res.name,
          weather: res.weather.length ? res.weather[0].main : '',
          temperature: res.main.temp,
          humidity: res.main.humidity,
          country: res.sys.country,
          time: moment()
        })
        this.$toastr.s('Успешно обновлено')
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
    .md-card {
        padding: 24px;
        max-width: 824px;
        min-width: 350px;
        margin: 0 auto;
    }
    .detail {
        &__item {
            border-bottom: 1px solid #C4C4C4;
            font-size: 18px;
            line-height: 24px;
            color: #1B1B1B;
            height: 52px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &-time {
            font-size: 16px;
            line-height: 24px;
            text-align: right;
            color: #A8A8A8;
            margin-top: 8px;
        }
    }
</style>
