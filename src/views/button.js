import { getUrl } from '../config';
import './main.css';


let elements = [];
let body;

const makeUrl = params => {
    let flexipayUrl = getUrl(params.isSandbox);
    flexipayUrl += `?currency=${params.currency}&totalAmount=${params.totalAmount}&orderId=${params.orderId}&`;
    let count = 1;
    for (const x of params.product) {
        flexipayUrl += `productId-${count}=${x.productId}&productQuantity-${count}=${x.productQuantity}&productName-${count}=${x.name}&productPrice-${count}=${x.price}&productDescription-${count}=${x.description}`
        count++;
    }
    return flexipayUrl;
}

const checkCorrectness = params => {
    let isValid = true;
    let error = null;
    if (!params.merchantApiKey) {
        isValid = false;
        error = 'Missing Api Key'
    }
    return { isValid, error };
}

export function generatebutton(text, configurations) {
    // convert plain HTML string into DOM elements
    const { isValid, error } = checkCorrectness(configurations);
    if (!isValid) {
        showMessage();
        console.error(error)
    } else {
        let a = document.createElement('a');
        a.className = 'flexipay_link'
        a.innerHTML = 'Buy Now'
        a.href = makeUrl(configurations);
        a.target = '_blank';
        let div = document.getElementById('flexipayButton');
        div.append(a)
    }
}

export function showMessage() {
    let h3 = document.createElement('h3');
    h3.className = 'flexipay-error-title'
    h3.innerHTML = 'Error generating flexipay button. Check console for errors.'
    body = document.getElementsByTagName('body')[0];
    body.append(h3)
}

export function close() {
    while (elements.length > 0) {
        elements.pop().remove();
    }
    body.removeEventListener('click', close);
}