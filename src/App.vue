<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/icons/SideBar.vue';
import { useAuth0 } from '@auth0/auth0-vue'


const { isAuthenticated, isLoading } = useAuth0()

</script>

<template>
  {{ isAuthenticated }}
  <SideBar v-if="!isLoading && isAuthenticated"></SideBar>
  <RouterView />
</template>

<style scoped>

</style>
