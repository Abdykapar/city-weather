class CityService {
  getAll () {
    const cities = []
    return cities
  }

  getData (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&q=${city}&appid=${process.env.VUE_APP_WEATHER_KEY}`
    return fetch(url, { method: 'GET' }).then(res => res.json())
  }

  setStorage (cities) {
    localStorage.setItem('cities', JSON.stringify(cities))
  }
}

export const cityService = new CityService()
