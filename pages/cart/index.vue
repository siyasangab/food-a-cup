<template> 
    <v-flex xs12 sm6 offset-sm3 >
        <h2 style="text-align: center">Your order</h2>
        <br>
        <v-card v-for="item in items" :key="item.name" v-if="items" style="cursor: pointer">
            <v-card-title primary-title>
                <div class="primary-title mb-0">
                    <h3><span>{{ item.quantity }} x {{ item.name }} @ <span style="float: right">R{{ item.price }} each</span></span></h3>
                </div>
            </v-card-title>
            <v-card-text class="darkgrey--text" v-if="item.extras">
                <div v-for="extra in item.extras" :key="extra.category.heading">
                    <h4>{{ extra.category.heading }}</h4>  
                    <v-container>
                        <div v-for="option in extra.options" :key="option.id">
                        <span style="letter-spacing: 1px">{{ option.name }} <span style="float: right">{{ option.price }}</span></span>                      
                    </div>
                    </v-container>
                </div>
            </v-card-text>
            <v-card-text style="text-align: right">
                <strong>Sub total: R{{ item.subtotal.toFixed(2) }}</strong>
            </v-card-text>
            <v-card-actions>
                <v-btn color="orange darken-3" class="white--text">Change</v-btn>
                <v-btn flat color="orange" @click="addUpdateCartItem(item, -item.quantity)">Remove</v-btn>       
                <v-spacer></v-spacer>
                <v-btn color="green" icon class="white--text" @click="addUpdateCartItem(item, -1)">
                    <v-icon>remove</v-icon>
                </v-btn>
                <v-btn color="green" icon class="white--text" @click="addUpdateCartItem(item, 1)">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card>
            <br>
            <v-card-text style="text-align: right">
                <h3>Order total: {{ $store.state.cart.total.toFixed(2) }}</h3>
            </v-card-text>
            <v-card-actions>
                <v-btn large flat color="grey darken2" :disabled="!$store.state.cart || $store.state.cart.items.length === 0">
                    Save for later 
                </v-btn>
                <v-spacer></v-spacer>
                <nuxt-link to="/checkout">
                    <v-btn large  color="yellow darken1" :disabled="!$store.state.cart || $store.state.cart.items.length === 0">
                        Checkout <v-icon>chevron_right</v-icon>
                    </v-btn>
                </nuxt-link>
                
            </v-card-actions>
        </v-card>
    </v-flex>
</template>
<script>
    export default {
        data() {
            return {
                selectedItem: null
            }
        },
        computed: {
            items() {
                return this.$store.state.cart.items
            }
        },
        methods: {
            addUpdateCartItem(item, quantity) {
            const cartItem = {
                id: item.id,
                quantity: quantity,
                price: item.price,
                name: item.name,
                extras: item.extras
            }

            this.$store.dispatch('addUpdateCartItem', cartItem);
            return false;
            }
        }
    }
</script>
<style scoped>
    
</style>


