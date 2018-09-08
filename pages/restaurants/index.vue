<template>
<div>
    <v-container>
        <v-text-field label="Search for restaurant, cuisine etc" prepend-icon="search"></v-text-field>
        <v-layout row wrap center>
            <v-flex xs12 sm6 md4 v-for="restaurant in restaurants" :key="restaurant.slug" @click="setSelectedRestaurant(restaurant)">
                <v-card style="margin: 15px;">
                    <nuxt-link :to="'/restaurants/' + restaurant.slug + '/menu/'">
                        <v-card-media v-bind:src="restaurant.banner_url" height="150"></v-card-media>
                    <v-card-title primary-title>
                        <h5 class="headline mb-0">{{ restaurant.name }}</h5>
                        
                    </v-card-title>
                    <span style="padding: 0 16px; display: inline-block">{{ restaurant.cuisine }}</span>
                    <br>
                    <span style="padding: 0 16px; display: inline-block">+- {{ restaurant.distance.toFixed(2) }}km</span>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="purple">
                            <v-icon>call</v-icon>
                        </v-btn>
                        <v-btn flat color="purple">
                            <v-icon>favorite</v-icon>
                        </v-btn>
    
                    </v-card-actions>
                    </nuxt-link>
                </v-card>
        </v-flex>
    </v-layout>
    </v-container>
    
  </div>
</template>
<script>
    export default {
        data() {       
            return  {
                query: '',
                styleObject: {
                    color: 'red',
                    fontSize: '13px'
                }
            }
        },

        methods: {
            getBannerTransformUrl(url) {
                let split = url.split('/');

                if(!split || split.length < 5)
                    return 'No Image Available';

                split[5] += '/c_fill,h_150,w_250';

                let joined = split.join('/');
                alert(url)
                return url;
            },

            setSelectedRestaurant(restaurant) {
                this.$store.dispatch('setSelectedRestaurant', restaurant);
                this.$router.push({
                    path: `/restaurants/${restaurant.slug}/menu`
                })
            }
        },

        async asyncData(ctx) {
            const lat = ctx.query.lat;
            const lng = ctx.query.lng;
            if(!lat || !lng)
                return ctx.redirect('/');

            return await ctx.store.dispatch('findRestaurantsWithinRadius', {
                lat: lat,
                lng: lng,
            }).then((res) => {
                return {
                    restaurants: res.data
                }
            })
        }
    }
</script>

<style scoped>
   
</style>

