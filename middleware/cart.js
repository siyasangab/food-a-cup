export default function(ctx) {
    if(!ctx.store.state.cart || ctx.store.state.cart.items.length === 0) {
        return ctx.redirect('/');
    }
}