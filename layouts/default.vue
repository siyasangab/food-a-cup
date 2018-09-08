<template>
    <v-app id="inspire">       
        <v-toolbar color="purple darken-3" dark fixed app >
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title slot="extension" class="white--text center" v-if="$store.state.placeLongName">
              <v-btn color="purple darken-2">
                  <small>
                      {{ $store.state.placeLongName.substring(0, $store.state.placeLongName.indexOf(', South')) }}
                  </small>
              </v-btn>
          </v-toolbar-title>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
                <nuxt-link to="/restaurants/">
                    <v-icon color="yellow" large>local_dining</v-icon>
                </nuxt-link>
          </v-toolbar-title>
                
          <v-toolbar-title>
              <v-icon color="yellow" large>local_bar</v-icon>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer> 
          
          <v-toolbar-title>
              <div class="text-xs-center" style="padding: 10px 10px 0 0">
                  <nuxt-link to="/cart">
                    <v-badge dark overlap>
                        <span slot="badge">{{ $store.state.cart.items.length }}</span>                     
                            <v-icon large dark color="yellow">
                                shopping_cart        
                            </v-icon>                      
                    </v-badge>
                </nuxt-link>            
              </div>
          </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <nuxt/>
        </v-content>
        <v-footer dark height="auto">
            <v-card flat tile class="indigo lighten-1 white--text text-xs-center">
                <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
                        <v-icon size="24px">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text pt-0">
                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                  &copy;2018 — <strong>Vuetify</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
  }),
  props: {
    source: String
  },
  methods: {
      logout() {
          this.$store.dispatch('auth/logout');
      }
  },    
};
</script>
<style scoped>
    .v-toolbar__title white--text {
        margin: 0 auto !important;
    }
</style>
