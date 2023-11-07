<template>
    <nav>
        <ul>
            <li v-for="link in links" :key="link.key">
               
                <RouterLink :to="{
                    name: link.key,
                    params: link.key==='city' ? {city: 'orlando'} : undefined}"> {{  link.name }}</RouterLink>
            </li>
        </ul>
    </nav>
</template>


<script setup>
    import { ref } from 'vue';
    import {RouterLink}  from 'vue-router'
    import router from '@/router'
    console.log("router: ", router.getRoutes());

    const links = ref([
        { key: 'login',  name: 'Landing Screen'},
        { key: 'home',  name: 'Home Screen'},
        { key: 'city',  name: 'Weather Screen'},
    ])
</script>

<style scoped>
    nav {
        width: 15em;
    }
    ul {
        display: flex;
        flex-flow: column;
        list-style-type: none;
        width: 100%;
        justify-content: space-between;
    }



    



</style>