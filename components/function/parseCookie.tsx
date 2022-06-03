import cookie from "cookie"
import Cookie from "js-cookie"

export async function parseCookie({req}: any) {
    if (typeof window !== 'undefined') {
        return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
    } else {
        console.log('You are on the server')
        const test = await Cookie.get('user')
        console.log(test)
        return cookie.parse('user')
    }
   
}