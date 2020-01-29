<template>
    <div>
       Name:  <input type="text" v-model="name"/>
       Email: <input type="text" v-model="email"/>
       Password: <input type="password" v-model="password"/>
       <button @click="signup">Register</button>
    </div>

</template>
<script>
import axios from 'axios';
export default {  
    name: 'Signup',
    data() {
        return {
        name: '',
        email: '',
        password: '',
        }
    },
    methods: {
        signup() {
            let newUser= {
                name: this.name,
                email: this.email,
                password: this.password
            }
        axios.post('http://localhost:3000/signup', newUser)
           
        }
    }
}
</script>
<style>
input {
    display: block;

}
</style>