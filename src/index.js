import Cookies from 'js-cookie'
import Pizzly from 'pizzly-js'

const pizzly = new Pizzly({ host: PIZZLY_URL }) // Initialize Pizzly
const twitterAPI = pizzly.integration('twitter') // Replace with the API slugname

function on_sign_in_button_click() {
    twitterAPI
        .connect()
        .then(({ authId }) => on_signed_in(authId))
        .catch(console.error);
}

function on_signed_in(twitterAuthId) {
    const signInButton = document.getElementById("sign_in_button");
    signInButton.style.display = 'none';

    Cookies.set("twitter-auth-id", twitterAuthId);
    twitterAPI.auth(twitterAuthId).get('account/verify_credentials.json')
        .then(responseRaw => responseRaw.json())
        .then(responseJson => document.getElementById("app_title").innerText = `Hi ${responseJson['name']}`)
        .catch(console.error);
}

function on_page_load() {
    const signInButton = document.getElementById("sign_in_button");
    signInButton.addEventListener("click", on_sign_in_button_click);

    const twitterAuthId = Cookies.get("twitter-auth-id");
    if (twitterAuthId) {
        on_signed_in(twitterAuthId);
    } else {
        signInButton.style.display = 'block';
    }
}

window.onload = on_page_load();