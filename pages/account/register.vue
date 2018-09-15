<template>
    <v-layout row wrap>
        <v-container>
            <div class="text-lg-center">
                <h1>It gets better from here!</h1>
                <p>We need you to do this so that you can have the best experience on our platform.</p>
            </div>
            <br>
            <v-flex s12 sm6 offset-sm3>
                <v-form ref="registrationForm" v-model="valid">
                    <v-text-field :rules="nameRules" label="* Name(s)" max-length="3"></v-text-field>
                    <v-text-field :rules="surnameRules" label="* Surname"></v-text-field>
                    <v-text-field :rules="phoneRules" label="* Phone number" mask="phone"></v-text-field>
                    <v-text-field :rules="emailRules" label="* Email address"></v-text-field>   
                    <v-flex xs12>
                        <v-text-field :append-icon="showPassword ? 'visibility_off' : 'visibility'"  :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" label="* Strong password" ></v-text-field>
                        <div slot="hint">
                            <v-container>
                                <small v-for="hint in passwordHints" :key="hint">{{ hint }} <br></small>
                            </v-container>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <v-checkbox color="green" :rules="acceptTermsRules">
                            <div slot="label">
                                Do you accept the <a href="javascript:;">terms</a> and <a href="javascript:;">conditions?</a>
                            </div>
                        </v-checkbox>
                    </v-flex>
                    <small>* required field</small>
                    <br>
                    <v-btn :disabled="!valid" @click="register">
                        Register
                    </v-btn>
                </v-form>
                <v-snackbar v-model="errorSnackBar" color="error" :timeout="snackbarTimeOut" vertical >
                    {{ errorMessage }}
                    <v-btn dark @click="errorSnackBar = false">
                        Close
                    </v-btn>
                </v-snackbar>
            </v-flex>    
        </v-container>
    </v-layout>
</template>
<script>
export default {
    data() {
        return {
            model: {
                first_name: "",
                last_name: "",
                nickname: "",
                cellphone: "",
                city: "",
                username: "",
                password: ""
            },
            passwordHints: [
                'Atleast 8 characters',
                'Include numbers and alphabets',
                'UPPERCASE and lowercase characters'
            ],
            errorSnackBar: false,
            snackbarTimeOut: 10000,
            errorMessage: '',
            showPassword: false,
            valid: true,
            nameRules: [
                v => v = !!v || 'Name is required'
            ],
            surnameRules: [
                v => v = !!v || 'Surname is required'
            ],
            phoneRules: [
                v => v = !!v || 'Phone number is required'
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
            ],
            acceptTermsRules: [
                v => !!v || 'Please read and accept our terms and conditions'
            ]
        };
    },

    methods: {
        register() {
            this.$store.dispatch("auth/register", this.model).then(res => {
                this.$router.replace("login");
            }).catch((err) => {
                this.errorSnackBar = true;

            });
        }
    }
};
</script>