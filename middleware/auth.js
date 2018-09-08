import { ACCESS_TOKEN_NAME } from '~/config';

export default function(ctx) {
    if(!isAuth(ctx)) {
        return ctx.redirect(`/account/login/?returnUrl=${ctx.route.path}`);
    }
}

function isAuth(context) {
    const authCookie = context.app.$cookies.get(ACCESS_TOKEN_NAME);
    if(!authCookie)
        return false;
    return true;
}