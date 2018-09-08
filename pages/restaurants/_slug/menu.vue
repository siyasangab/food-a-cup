<template>
<div>
    <v-layout>
        <v-flex xs12 sm6  offset-sm3 v-if="restaurant">
          <v-card>
            <v-card-media :src="restaurant.banner_url" height="200px" style="background-size: cover; background-position: center"></v-card-media>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ restaurant.name }}</h3>
                <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
              </div>
            </v-card-title>

            <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
    <br>
    <v-container fluid grid-list-lg v-if="filteredMenu">
        <v-text-field label="Filter menu" prepend-icon="search" v-model="filterText"></v-text-field>
        <v-layout row wrap >
          <v-flex xs12 sm6 md4 v-for="menu in filteredMenu" :key="menu.name">
                <v-card color="white" class="gray--text" >
                    <v-card-title primary-title>
                        <strong>{{ menu.name }}</strong>
                    </v-card-title>
                    <v-list v-for="item in menu.items" :key="item.slug" class="no-padding" style="border: 1px solid #eee; cursor: pointer">
                        <v-list-tile @click="onItemSelected(item)">
                            <small>{{ item.name }}</small>
                            <v-spacer></v-spacer>
                            <small>R{{ item.price }}</small>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition" width="600" v-if="selectedItem">
      <v-card>
        <v-toolbar dark color="blue darken-7">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedItem.name }}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list subheader v-for="menuOption in menuOptions" :key="menuOption.heading">
            <v-subheader><strong>{{ menuOption.heading }}</strong> <v-spacer></v-spacer> <small v-if="menuOption.num_choose > 1"> Choose {{ menuOption.num_choose }}</small></v-subheader>
            <v-list-tile avatar v-for="option in menuOption.options" :key="option.id">
                <v-list-tile-action v-if="menuOption.multi || menuOption.num_choose > 1">
                    <v-checkbox @change="toggleExtra(menuOption, option)" :label="option.name" :value="option.id"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-action v-if="menuOption.mandatory && menuOption.num_choose <= 1">
                    <v-radio-group v-model="radioGroup" :mandatory="menuOption.mandatory">
                        <v-radio @change="toggleExtra(menuOption, option)" :key="option.name" :label="option.name" :value="option.id"></v-radio>
                    </v-radio-group>
                </v-list-tile-action>
                <v-spacer></v-spacer>
                <v-list-tile-action>
                    <v-list-tile-title>
                        <small style="color: rgba(0, 0, 0, .54)">
                            R{{ option.price }}
                        </small>
                    </v-list-tile-title>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon color="green darken-1 white--text" @click="addUpdateCartItem(-1)"><v-icon>remove</v-icon></v-btn>
            <v-btn>Add to cart</v-btn>
            <v-btn icon color="green darken-1 white--text" @click="addUpdateCartItem(1)"><v-icon>add</v-icon></v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="mode === 'multi-line'" :timeout="timeout" :vertical="mode === 'vertical'" >
        Successfully added to cart
        <v-btn dark flat @click="snackbar = false">
            Close
        </v-btn>
    </v-snackbar>
  </v-layout>
    
</div>
  
</template>

<script>
import axios from "axios";
import slugify from '~/utils/slugify';
import _ from 'lodash';

export default {
    data() {
        return {
            filterText: '',
            menus: [],
            selectedItem: null,
            menuOptions: [],
            dialog: false,
            radioGroup: 'radio-1', 
            extras: [],
            snackbar: false,
            color: 'success',
            mode: '',
            timeout: 6000
        };
    },
    computed: {
        filteredMenu() {
            return this.menus.filter(m => {
                return m.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1 ||
                m.items.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1
                })
            });
        }
    },

    methods: {
        onItemSelected (item) {
            this.selectedItem = item;
            this.extras = [];
            this.$store.dispatch('getMenuOptions', {
                restaurant: this.restaurant.slug,
                menuItem: this.selectedItem.slug
            }).then((res) => {
                this.menuOptions = res.data;
                this.dialog = true;
            })
        },
        onItemDeselected () {
            this.selectedItem = null;
        },
        addUpdateCartItem(quantity) {
            debugger;
            const cartItem = {
                id: this.selectedItem.id,
                quantity: quantity,
                price: this.selectedItem.price,
                name: this.selectedItem.name,
                extras: this.extras
            }

            this.$store.dispatch('addUpdateCartItem', cartItem);
            this.snackbar = true;
            return false;
        },

        toggleExtra(category, extra) {
            let index = _.findIndex(this.extras, (e) => {
                return e.category.heading === category.heading
            });

            if(index > -1) {
                this.extras[index].options.push(extra);
                return;
            }

            this.extras.push({
                category: category,
                options: [extra]
            });

        },

        isOptionAdded(option) {
            let index = _.findIndex(this.extras, (extra) => {
                return _.findIndex(extra.options, (o) => {
                    return o.id === option.id
                })
            })
        },

        getItemCount(id) {
            for(let i = 0; i < this.$store.state.cart.items.length; i++) {
                if(this.$store.state.cart.items[i].id == id) {
                    return this.$store.state.cart.items[i].quantity;
                }
            }
            return 0.00
        },

        showOption(option) {
            alert(option.price)
        },

        slugify: slugify,
        
    },

    async asyncData(context) {
        return await context.store.dispatch('getMenu', context.route.params.slug).then((res) => {
            return {
                menus: res.data,
                restaurant: context.store.state.selectedRestaurant
            }
        })
    }
};
</script>

<style scoped>
    
</style>

