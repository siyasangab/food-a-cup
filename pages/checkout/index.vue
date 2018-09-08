<template>
    <v-layout row wrap>
        <v-container>          
            <v-flex s12 sm6 offset-sm3>
                <div style="text-align: center">
                    <h1>Checkout</h1>
                    <nuxt-link color="blue" to="/cart/">
                        <v-btn flat color="orange">
                            View order
                        </v-btn>
                    </nuxt-link>
                </div>
                <br>
                <h2>Delivery address</h2>
                <v-form ref="checkoutForm" v-model="valid" lazy-validation>
                    <v-text-field clearable="" name="input-7-1" label="Address" autofocus="" :value="$store.state.placeLongName"></v-text-field>
                </v-form>
                <v-form ref="checkoutForm" v-model="valid" lazy-validation>
                    <v-text-field name="input-7-1">
                        <div slot="label">
                            Unit number <small>(optional)</small>
                        </div>
                    </v-text-field>
                </v-form>
                <br>
                <h2>Payment Due: R{{ $store.state.cart.total.toFixed(2) }}</h2>
                <v-text-field clearable label="Name on card"></v-text-field>
                <v-text-field label="Card number" mask="####-####-####-####-###" clearable=""></v-text-field>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <v-text-field mask="##/##" clearable label="Expiry date" hint="The expiry date on your card. Format: month/year"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field clearable mask="###" label="CVV" hint="The CVV is the 3 digits at the back of your card"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-container>
    </v-layout>
    
</template>
<script>
    export default {
        middleware: ['auth', 'cart']
    }
</script>

<style scoped>
    
</style>
