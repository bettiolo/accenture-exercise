class Provider {

  // Gets the weather for a given city
  static getWeather(city) {
    return Promise.resolve(`The weather of ${city} is Cloudy`)
  };

  // Gets the weather for a given city
  static getLocalCurrency(city) {
    return Promise.resolve(`The local currency of ${city} is GBP`)
  };

  // Given Longtitude and latitude, this function returns a city
  static findCity(long, lat) {
    return Promise.resolve(`London`)
  };
}

/*
To-do:
1) Print the city for lat/long 51.5074 and 0.1278 in console
2) Print the weather for lat/long 51.5074 and 0.1278
3) Print the weather and currency for a given city (London)
 */

(async () => {
  try {
    // 1) Print the city for lat/long 51.5074 and 0.1278 in console
    const city = await Provider.findCity(0.1278, 51.5074);
    console.log('city', city);

    // 2) Print the weather for lat/long 51.5074 and 0.1278
    const weather = await Provider.getWeather(city);
    console.log('weather', weather);

    // 3) Print the weather and currency for a given city (London)
    const currency = await Provider.getLocalCurrency(city);
    console.log('weather', weather, 'currency', currency);
  } catch (e) {
    console.error(e);
  }
})();


