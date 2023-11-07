<template>
    You have been logged out
</template>


<script setup>

import {onMounted} from 'vue'
import { useAuth0  } from '@auth0/auth0-vue'
import router from '@/router/'

const auth0 = useAuth0()

const logout =  async () => {
    await auth0.logout({
        logoutParams :{
            returnTo: window.location.origin
        }
    })
    router.push("/")
}



onMounted(()=> {
    logout()
})

</script>