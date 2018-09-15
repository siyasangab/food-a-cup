import api from '~/api';
import isEqual from '~/utils/isEqual';
import _ from 'lodash';

export const state = () => ({
    returnUrl: '',
    restaurant: 1,
    cart: {
        total: 0,
        items: []
    },
    deliveryMethod: '',
    selectedRestaurant: null,
    userPosition: null,
    placeLongName: '',
    restaurants: []
})

export const mutations = {  
    setReturnUrl(store, url) {
        store.returnUrl = url;
    },

    addUpdateCartItem(store, cartItem) {
        debugger;
        const index = _.findIndex(store.cart.items, (item, i) => {
            return item.id === cartItem.id && isEqual(store.cart.items[i].extras, cartItem.extras)
        });

        if(index === -1 && cartItem.quantity === -1) {
            return;
        }

        let extrasTotal = 0;
        _.forEach(cartItem.extras, (extra) => {
            _.forEach(extra.options, (option) => {
                extrasTotal += parseFloat(option.price);
            })
        });

        if(index === -1) {
            store.cart.items.push({
                id: cartItem.id,
                quantity: cartItem.quantity,
                name: cartItem.name,
                price: cartItem.price,  
                extras: cartItem.extras,
                subtotal: (cartItem.quantity * cartItem.price) + extrasTotal
            });
            
            store.cart.total =  _.sumBy(store.cart.items, (item) => {
                return item.subtotal
            })
            return;
        }

        store.cart.items[index].quantity += cartItem.quantity;

        if(store.cart.items[index].quantity <= 0) {
            store.cart.total -= store.cart.items[index].subtotal;
            store.cart.items.splice(index, 1);
            return;
        }

        extrasTotal = 0;
        _.forEach(store.cart.items[index].extras, (extra) => {
            _.forEach(extra.options, (option) => {
                extrasTotal += parseFloat(option.price);
            })
        });
        store.cart.items[index].subtotal = (store.cart.items[index].quantity * cartItem.price) + extrasTotal;
        store.cart.total = _.sumBy(store.cart.items, (item) => {
            return item.subtotal
        })  
    },

    sumOptions(extras) {
        

        return sum;
    },

    setDeliveryMethod(store, method) {
        if(['collection', 'delivery'].indexOf(method) === -1)
            return;      
        store.deliveryMethod = method;
    },

    submitOrder(store) {
        const order = {
            restaurant: store.restaurant,
            items: store.cart.items
        }   
    },

    setSearchQuery(store, query) {
        store.searchQuery = query;
    },

    setSelectedRestaurant(store, restaurant) {
        store.selectedRestaurant = restaurant;
    },
    setPlaceLongName(store, longName) {
        store.placeLongName = longName;
    },

    setUserPosition(store, data) {
        store.userPosition = data;
    },

    setRestaurants(store, restaurants) {
        store.restaurants = restaurants;
    }, 
}

export const actions = {
    setReturnUrl({commit}, url) {
        commit('setReturnUrl', url);
    },

    addUpdateCartItem({commit}, cartItem) {
        commit('addUpdateCartItem', cartItem);
    },

    setPaymentMethod({commit}, method) {
        commit('setPaymentMethod', method);
    },

    setDeliveryMethod({commit}, method) {
        commit('setDeliveryMethod', method);
    },

    submitOrder({commit}) {
        commit('submitOrder');
    },

    getMenuOptions({commit}, data) {
        return api.menu.getOptions(data.restaurant, data.menuItem);
    },

    setSelectedRestaurant({commit}, restaurant) {
        commit('setSelectedRestaurant', restaurant);
    },

    getChatRooms({commit}) {
        return api.chat.getRooms();
    },

    getMenu({commit}, slug) {
        return api.restaurants.getMenu(slug);
    },

    setPlaceLongName({commit}, longName) {
        if(!longName)
            return;
        commit('setPlaceLongName', longName)
    },

    findRestaurantsWithinRadius({commit}, data) {
        if(!data)
            return;

        commit('setUserPosition', data);
        return api.restaurants.findWithinRadius(data.lat, data.lng);
    },

    setRestaurants({commit}, restaurants) {
        if(!restaurants)
            return;

        commit('setRestaurants', restaurants);
    }
}