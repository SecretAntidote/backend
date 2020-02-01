<template>
    <div>
        <button @click="logout">Logout</button>

        <h1>Hello {{ name }}</h1>
        <h2>your email is: {{ email }}</h2>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Landing',
    data(){
        return {
            name: '',
            email: '',
        }
    },
    created() {
        if (localStorage.getItem('token') === null){
            this.$router.push('/login');
        }
    },
     mounted() {
    axios.get('http://localhost:3000/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
      })
    },
    methods: {
        //CLEARN LOCAL STORAGE POUR LE TOKEN DE LOGIN. POUR ENLEVER LE TOKEN
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>