<template>
    <div class="city-container">
        <h1>Weather forecast - {{ city  }}</h1>
        <div class="weather-items">
          <div v-for="item in data" :key="item.key" class="weather-item" :class="{'desktop-only': item.desktopOnly}">
            <div class="weather-item-title">{{ item.name }}</div>
            <div class="weather-item-value">{{ item.value }}</div>
          </div>
        </div>
    </div> 

</template>    


<script setup>
    import axios from 'axios'
    import moment from 'moment'
    import {ref, onMounted, computed} from 'vue'
    import { useRoute } from 'vue-router'
    import { weather as owm_api_key } from '../../auth_config.json'

    const route = useRoute()


    const data = ref([
      {
        key: "dt",
        name: "Data/Time",
        value: '',
      },
      {
        key: "temp",
        name: "Temperature",
        value: 0
      },
      {
        key: "description",
        name: "Description",
        value: '', desktopOnly: true
      },
      {
        key: "main",
        name: "Main",
        value: '', 
        desktopOnly: true
      },
      {
        key: "pressure",
        name: "Pressure",
        value: '', 
        desktopOnly: true
      },
      {
        key: "humidity",
        name: "Humidity",
        value: '', 
        desktopOnly: true
      },
    ])





    const city = computed(() => (route.params.city).toUpperCase())

    const getWeatherForecast = async () => {

        
         const lat = ref(0);
         const lon = ref(0);
       

         const apiUrl_geotag = `http://api.openweathermap.org/geo/1.0/direct?q=${route.params.city}&appid=${owm_api_key}`;
         try {
           const response = await axios.get(apiUrl_geotag);
           lat.value = response.data[0].lat
           lon.value = response.data[0].lon
           
           if (lat.value && lon.value) {
             const apiUrl_forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat.value}&lon=${lon.value}&appid=${owm_api_key}`;
             
             const response2 = await axios.get(apiUrl_forecast)
             console.log("response2: ", response2.data);


             data.value = data.value.map(element => {
                if (element.key==='dt') return { ... element, value: moment(response2.data.list[0].dt_txt).format("L")}
                if (element.key==='temp') return { ... element, value: response2.data.list[0].main.temp}
                if (element.key==='description') return { ... element, value: response2.data.list[0].weather[0].description }
                if (element.key==='main') return { ... element, value: response2.data.list[0].weather[0].main }
                if (element.key==='pressure') return { ... element, value: response2.data.list[0].main.pressure }
                if (element.key==='humidity') return { ... element, value: response2.data.list[0].main.humidity }

             })
            }


         } catch (error) {
           console.error(error);
         }
    }

    onMounted( async ()=> {
        await getWeatherForecast()
    })
    


</script>


<style scoped>

  .weather-items {
    display: flex;
    width: 100%;
    gap: 3px;
  }

  .weather-item {
    border: 1px solid #aaa;
    display: flex;
    flex-flow: column;
    padding: 1em;
    width: 100%;
    align-items: center;
  }

  .weather-item-title {
    border-bottom: 2px solid rgb(92, 15, 15);
    width: 100%;
    padding: 0.2em;
    margin: 0.5em;
    text-align: center;
    color: #9e2a2a;
  }




  @media (max-width: 500px) {
    .desktop-only {
      display: none;
    }
  }
</style>
