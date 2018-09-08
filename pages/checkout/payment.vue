<template>
    <div>
        <div class="container">
            <div class="highlighted">
                <h4>Choose Payment Method {{ paymentMethod }}</h4>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-header">
                            <label class="input-container">Credit Card
                                <input type="checkbox" :checked="paymentMethod === 'creditcard'" @change="setPaymentMethod('creditcard')">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="card-body">
                            <small class="">
                                Your credit card details will be required.
                                Your credit card details will be transfered securely and we do not store your credit card information on our system.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-header">
                            <label class="input-container">PayPal
                                <input type="checkbox" :checked="paymentMethod === 'paypal'" @change="setPaymentMethod('paypal')">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="card-body">
                            <small class="">
                                You will be sent to PayPal to process the payment.
                                Paypal is a secure online payment processing portal. You will be redirected to their site to complete your payment
                            </small>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-header">
                            <label class="input-container">Instant EFT
                                <input type="checkbox" :checked="paymentMethod === 'instanteft'" @change="setPaymentMethod('instanteft')">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="card-body">
                            <small class="">
                                Allow +- 15 minutes for us to process your transfer.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div class="checkout">
            <h4 @click="submitOrder()">
                SUBMIT <i class="fa fa-check"></i>
            </h4>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            paymentMethod() {
                return this.$store.state.paymentMethod;
            }
        },
        methods: {
            setPaymentMethod(method) {
                this.$store.dispatch('setPaymentMethod', method);
            },

            submitOrder() {
                this.$store.dispatch('submitOrder');
            }
        }
    }
</script>
<style scoped>
    .checkout > h4 {
        margin-top: 18px !important;
    }

    .lead {
        font-size: x-small;
        padding-left: 10px;
    }
    .card-header {
        border: none;
        background: #fff;
    }
</style>
