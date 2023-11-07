<template>
    <div class="container">
        <h1>Hello World!</h1>
        <h2>Welcome!</h2>
        <div class="login">
            <form @submit.prevent="">
                <button @click="login"> Login via Github</button>
            </form>
        </div>

    </div>
</template>


<script setup>
    import { useAuth0  } from '@auth0/auth0-vue'

    const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();


    const login = () => {
        loginWithRedirect()
    }

</script>


<style scoped>
    .container {
        border: 1px solid rgb(175, 175, 175);
        border-radius: 0.5em;
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 600px;
    }

    button {
        padding: 0.5em 3em;
        font-size: 1.1em;
    }

    h1 {
        font-size: 5em;
        text-align: center;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 2em;
        margin-bottom: 0.8em;
    }
</style>
