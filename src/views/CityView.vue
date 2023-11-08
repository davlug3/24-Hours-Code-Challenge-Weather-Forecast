<template>
    <div class="container">

        <div class="content">
          <table>
            <thead>
              <tr class="header-1">
                <th v-for="item in data" :key="item.key">{{  item.name_a }}</th>
              </tr>
              <tr class="header-2">
                <th v-for="item in data" :key="item.key">{{  item.name_b }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="item in data" :key="item.key"> {{  item.value }}</td>
              </tr>
            </tbody>
          </table>


          <button>Back</button>
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
        name_a: "Date",
        name_b: "(mm/dd/yyyy)",
        value: '',
      },
      {
        key: "temp",
        name_b: "Temp(F)",
        value: 0
      },
      {
        key: "description",
        name_b: "Description",
        value: '', desktopOnly: true
      },
      {
        key: "main",
        name_b: "Main",
        value: '', 
        desktopOnly: true
      },
      {
        key: "pressure",
        name_b: "Pressure",
        value: '', 
        desktopOnly: true
      },
      {
        key: "humidity",
        name_b: "Humidity",
        value: '', 
        desktopOnly: true
      },
    ])


    const getHeaderRows = computed(() => {
      return data.value.map(x=> {
        return Array.isArray(x.name) ? [...x.name] : [x.name]
      })
    })



    const numOfHeaderRows = computed(()=> {
      return getHeaderRows.value.reduce((prev, curr)=> {
        return curr.length > prev ? curr.length : prev
      }, 0)
    })
    
    console.log("getHeaderRows: ", getHeaderRows.value, numOfHeaderRows.value);


    const city = ref('')

    const getWeatherForecast = async () => {

        
         const lat = ref(0);
         const lon = ref(0);
       

         const apiUrl_geotag = `http://api.openweathermap.org/geo/1.0/direct?q=${route.params.city}&appid=${owm_api_key}`;
         try {
           const response = await axios.get(apiUrl_geotag);
           lat.value = response.data[0].lat
           lon.value = response.data[0].lon
           city.value = response.data[0].name
           
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

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    width: 60em;
    display: flex;
    flex-flow: column;

  }


  table {
    border-collapse: collapse;
    width: 100%
  }
  

  .header-1 {
    background-color: #ddd ;

  }
  .header-2 {
    background-color: #bbb ;

  }

  td, th {
    border: 1px solid #444;
    font-size: 1.5em;
    padding: 0.4em;
    text-align: center;
  }


  button {
    width: 10rem;
    margin-left:auto;
    margin-top: 10em;
  }
  @media (max-width: 500px) {
    .desktop-only {
      display: none;
    }
  }
</style>
