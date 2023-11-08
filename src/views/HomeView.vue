<template>
    <div class="container">
            <div class="field">{{ user.nickname }}</div>
            <div class="field"><a :href="url">{{ url }}</a></div>

            <div class="field">
                <form @submit.prevent="viewWeather(city)">
                    <input type="text" v-model="city" placeholder="City">
                    <div><button type="button">Display Weather</button></div>
                </form>
            </div>

    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import router from '../router'
    import {useAuth0} from '@auth0/auth0-vue'

    
    
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

    .container {
        display: flex;
        flex-flow: column;
        align-items: center;

    }
    .user {
        display: flex;
        flex-flow: column wrap;
    }
    .field {
        max-width: 50em;
        text-align: center;
        padding: 1.5em 0.5em;
        margin: 1.5em 0.15em;
        font-size: 1.3em;
     
    }

    


    input {
        margin: 0.3em;
        width: 100%;
    }

    button {
        margin-top: 2em;;
        width: 15em;
    }

    p:first-child {
        color: rgb(156, 156, 156);
        font-weight: bold;
        margin-bottom: 0.4em;

    }
</style>