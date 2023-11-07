<template>
    <div class="home-container">
        <h1>Home</h1>
        <!-- <pre>{{ user }}</pre> -->
        <div class="user">
            <div class="field"><p>username: </p><p>{{ user.nickname }}</p></div>
            <div class="field"><p>url: </p><p><a :href="url">{{ url }}</a></p></div>
        </div>
        <div class="field"><p>city: </p>
            <input type="text" v-model="city">
            <div><button type="button" @click="viewWeather(city)">weather</button></div>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import router from '../router'
    import {useAuth0} from '@auth0/auth0-vue'

    import SideBar from '@/components/icons/SideBar.vue';
    
    
    const auth0 = useAuth0()
    const {user} = auth0

    const url = `http://github.com/${user.value.nickname}`

    const city = ref('')


    const viewWeather = (city) => {
        console.log('city', city)

        router.push(`/city/${city}`)

    }
</script>

<style scoped>
    .home-container {
        display: flex;
        flex-direction: column;
    }

    .user {
        display: flex;
        flex-flow: row wrap;
    }
    .field {
        border: 1px solid rgb(156, 156, 156);
        padding: 1.5em;
        margin: 0.15em;
        border-radius: 5px;
    }


    input {
        margin: 0.3em;
        width: 100%;
    }

    button {
        width: 100%
    }

    p:first-child {
        color: rgb(156, 156, 156);
        font-weight: bold;
        margin-bottom: 0.4em;

    }
</style>