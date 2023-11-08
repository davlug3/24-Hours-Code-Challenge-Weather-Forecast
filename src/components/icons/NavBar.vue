<template>
    <nav>
        <!-- <ul>
            <li v-for="link in links" :key="link.key">
               
                <RouterLink :to="{
                    name: link.key,
                    params: link.key==='city' ? {city: 'orlando'} : undefined}"> {{  link.name }}</RouterLink>
            </li>
        </ul> -->

        <RouterLink :to="'/'">
            <!-- <img src="" alt=""> -->
            <h1>WF</h1>
        </RouterLink>
        <RouterLink :to="'/logout'">
            <button>Logout</button>
        </RouterLink>

    </nav>
</template>


<script setup>
    import { ref } from 'vue';
    import {RouterLink}  from 'vue-router'
    import router from '@/router'



</script>

<style scoped>
    nav {
        padding: 0.3em 3em;
        border-bottom: 2px solid #555;
        height: 5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  


    



</style>