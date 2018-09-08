<template>
    <div>
        {{ longAddress }}
    </div>
</template>
<style scoped>
    
</style>
<script>
    export default {
        computed: {           
            longAddress() {
                return this.$store.state.placeLongName
            } 
        }
    }
</script>
