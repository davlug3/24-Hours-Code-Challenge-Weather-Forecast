<script setup>
import {watch} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/icons/NavBar.vue';
import { useAuth0 } from '@auth0/auth0-vue'

import router from '@/router'
console.log(router.currentRoute.value);


const { isAuthenticated, isLoading } = useAuth0()






</script>

<template>

  <NavBar v-if="1" />
  <RouterView />
  <div style="margin-bottom: 34px; margin-left: auto;">auth {{ isAuthenticated  }} <br>load {{  isLoading }}</div>
</template>

<style scoped>

</style>
