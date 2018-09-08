<template>
    <v-layout row wrap>
        <v-container>
            <div class="text-lg-center">
                <h1>It gets better from here!</h1>
                <p>We need you to do this so that you can have the best experience on our platform.</p>
            </div>
            <br>
            <v-flex s12 sm6 offset-sm3>
                <v-form ref="registrationForm">
                    <v-text-field label="Name(s)" max-length="3" autofocus=""></v-text-field>
                    <v-text-field label="Surname"></v-text-field>
                    <v-text-field label="Phone number" mask="phone"></v-text-field>
                    <v-text-field label="Email address"></v-text-field>
                    <v-text-field label="Strong password" hint="Include numbers, special characters and alphabets. Must be atleast 8 characters long."></v-text-field>
                    <v-flex xs12>
                        <v-checkbox color="green">
                            <div slot="label">
                                Do you accept the <a href="javascript:;">terms</a> and <a href="javascript:;">conditions?</a>
                            </div>
                        </v-checkbox>
                    </v-flex>
                    <v-btn>
                        Register
                    </v-btn>
                    <v-btn>
                        Login
                    </v-btn>
                </v-form>
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
      }
    };
  },

  methods: {
    register() {
      this.$store.dispatch("auth/register", this.model).then(res => {
        this.$router.replace("login");
      });
    }
  }
};
</script>