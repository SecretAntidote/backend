<template>
    <div>
       Name:  <input type="text" v-model="name"/>
       Email: <input type="text" v-model="email"/>
       Password: <input type="password" v-model="password"/>
       <button @click="signup">Register</button>
       {{ error }}
    </div>

</template>
<script>
import axios from 'axios';
export default {  
    name: 'Signup',
    data() {
        return {
       
        email: '',
        password: '',

        error: '',
        }
    },
    methods: {
        signup() {
            let newUser= {
              
                email: this.email,
                password: this.password
            }
        axios.post('http://localhost:5000/signup', newUser)
           .then(res => {
               // eslint-disable-next-line no-console
               console.log(res)
               this.error = '';
               this.$router.push('/login');
           }, err=> {
               // eslint-disable-next-line no-console
               console.log(err.response)
               this.error = err.response.data.error
           })
        }
    }
}
</script>
<style>
input {
    display: block;

}

</style>