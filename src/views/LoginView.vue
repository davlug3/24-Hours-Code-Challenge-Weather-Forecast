<template>
    <div class="container">
        <div class="content">
            <p>Welcome to the weather forecast web application. Please login your github user to use the application and view weather in your city.</p>
            <div class="login">
                <button @click="login"> Login via Github</button>
            </div>
        </div>

    </div>
</template>


<script setup>
    import { useAuth0  } from '@auth0/auth0-vue'

    const { loginWithRedirect} = useAuth0();


    const login = () => {
        loginWithRedirect()
    }

</script>


<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      
    }


    .content {
        max-width: 50em;
        
    
    }




    p {
        font-size: 1.6em;
        

    }
    

    button {
        padding: 0.5em 2em;
        font-size: 1.1em;
        margin-top: 3em;
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



    @media (max-width: 830px ) {
    .content {
        margin: 2em;
    }

    
}
</style>
