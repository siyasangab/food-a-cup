<template>
    <v-layout row wrap>
        <v-container>
            <h1 style="text-align: center">Login to your account</h1>
            <v-flex s12 sm6  offset-sm3>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="email" :rules="emailRules" label="Email" required type="email" autofocus=""></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" required type="password"></v-text-field>
                    <v-btn :disabled="!valid" @click="login" >
                        Login
                    </v-btn>
                </v-form>
                <v-snackbar v-model="snackbar" color="error" :timeout="snackbarTimeOut" vertical >
                    Incorrect email and password combination.
                    <v-btn dark flat @click="snackbar = false">
                        Close
                    </v-btn>
                </v-snackbar>
            </v-flex>
        </v-container>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        password: '',
        passwordRules: [
            v => !! v || 'Password is required'
        ],
        snackbar: false,
        snackbarTimeOut: 10000
    }),

    methods: {
        login: function() {
            if (!this.email || !this.password) return;
            this.$store.dispatch("auth/login", {
                username: this.email,
                password: this.password
            }).then((res) => {
                const redirectUrl = this.$route.query.returnUrl || '/';
                this.$router.replace(redirectUrl);
            }).catch((error) => {
                this.snackbar = true;
            });
        }
    }
};
</script>
<style>

</style>
