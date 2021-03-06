  var axios = require('axios');
{/* axios JavaScript library is used here to handle the incoming data from the API. */}

  const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=1a7125d40a157a59f5d0e03d12dbff2f&units=metric';
  {/* the OPEN_WEATHER_MAP_URL stores data that will come from the API link listed above. */}
  {/* (step 6 behind the scenes) axios JavaScript library received the city name from this.props.onSearch(location) from WeatherForm.jsx */}



  {/* (step 7 behind the scenes) after axios finishes working with the API data as instructed it will send the temperature or error message via module.exports to Weather.jsx then later to WeatherMessage.jsx   */}
  module.exports = {
        getTemp: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
        {/* (step 6.1 behind the scenes) axios receives city name from this.props.onSearch(location), axios makes sure that the API webpage link is
          working properly by adding/removing some parameters to it using encodeURIComponent(location) and sending a clean API link to the requestUrl
          by using `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`.   */}

      return  axios.get(requestUrl).then(function (res) {
          if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
          } else {
            return {
              location: `${res.data.name}, ${res.data.sys.country}`,
              temp: Math.floor(res.data.main.temp)
            }
          }

          {/* (step 6.1 behind the scenes) axios checks the respons [res] from the API through the requestUrl and check if the data about the city is
            correct using location: `${res.data.name}, ${res.data.sys.country}`  if not correct axios shows an error message */}

        }, function(err) {
              throw new Error('Unable to fetch weather for that location');  {/* (step 6.2 behind the scenes) if the data from the API is corrupt/damaged axios throws an error
            through Error(err.response.data.message)  */}

        });
      }

  }
