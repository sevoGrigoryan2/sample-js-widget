import { ping } from './services';
import { generatebutton } from './views/button';

const supportedAPI = ['init', 'generatebutton']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
    The main entry of the application
    */
function app(window) {
    console.log('Flexipay-Widget starting');

    // set default configurations
    let configurations = {
        someDefaultConfiguration: false,
        merchantApiKey: null,
        sandbox: true
    };

    // all methods that were called till now and stored in queue
    // needs to be called now 
    let globalObject = window[window['Flexipay-Widget']];
    let queue = globalObject.q;
    if (queue) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i][0].toLowerCase() == 'init') {
                configurations = extendObject(configurations, queue[i][1]);
                console.log('Flexipay-Widget started', configurations);
            }
            else
                apiHandler(queue[i][0], queue[i][1], configurations);
        }
    }

    // override temporary (until the app loaded) handler
    // for widget's API calls
    globalObject = apiHandler;
    globalObject.configurations = configurations;
}

/**
    Method that handles all API calls
    */
function apiHandler(api, params, configurations) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();

    if (supportedAPI.indexOf(api) === -1) throw Error(`Method ${api} is not supported`);

    console.log(`Handling API call ${api}`, params);

    switch (api) {
        // TODO: add API implementation
        case 'generatebutton':
            console.log('params', params)
            generatebutton(params, configurations);
            break;
        default:
            console.warn(`No handler defined for ${api}`);
    }
}

function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

app(window);