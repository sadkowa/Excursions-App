import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

const excursionsApi = new ExcursionsAPI()

document.addEventListener('DOMContentLoaded', init())

function init() {
    console.log('client');

    load()
    addItemToBasket()

}

function load() {
    excursionsApi.loadExcursions('/excursions')
    excursionsApi.loadOrder()
        // .then(data => fillInSummary(data)
        // )


}

function addItemToBasket() {
    const excursionList = document.querySelector('.panel__excursions')

    excursionList.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.value === 'dodaj do zamówienia') {
            const data = getOrderData(e)

            if (data) {
                excursionsApi._fetch('/orders')
                    .then(resp => sendOrderData(resp, data))
            }

        }
    })

}

function getOrderData(e) {
    const form = e.target.parentNode.parentNode
    const liItem = form.parentNode
    const title = liItem.querySelector('.excursions__title')
    const adultPrice = form.querySelector('.excursions__adult-price')
    const childPrice = form.querySelector('.excursions__child-price')
    const [adultPriceInput, childPriceInput] = form.elements

    if (adultPriceInput.value === '' || childPriceInput.value === '') {
        return alert('Pole "dorosły" oraz "dziecko" nie mogą być puste')
    }
    const data = {
        title: title.textContent,
        adultPrice: adultPrice.textContent,
        adultNumber: Number(adultPriceInput.value),
        childPrice: childPrice.textContent,
        childNumber: Number(childPriceInput.value)
    }
    return data
}

function sendOrderData(resp, data) {
    const basketList = resp

    const existedItemIndex = basketList.findIndex((item) => {
        return item.title === data.title
    })
    if (existedItemIndex === -1) {
        excursionsApi.add(data, '/orders')
    }
    else {
        basketList.forEach(item => {
            if (item.title === data.title) {
                data.adultNumber += item.adultNumber
                data.childNumber += item.childNumber

                const options = {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                }

                excursionsApi.update(`/orders/${item.id}`, options)
            }
        })
    }

}

// function fillInSummary(data) {
//     const totalPriceElement = document.querySelector('.order__total-price-value')
//     const excursionPriceElement = document.querySelector('.summary__total-price')

//     const totalSum = countTotalSum(data)
//     totalPriceElement.textContent = totalSum + "PLN"

//     console.log(totalSum)
// }

// function countTotalSum(data) {
//     let price = 0

//     const basket = data
//     basket.forEach(el => {

//         price = price + el.adultPrice * el.adultNumber + el.childPrice * el.childNumber
//         return price
//     })
//     // console.log(basket)


//     return price
// }

// function fillInSummary() {
//     const totalPriceElement = document.querySelector('.order__total-price-value')
//     const excursionPriceElement = document.querySelector('.summary__total-price')

//     const totalSum = countTotalSum()
// }

// function countTotalSum() {
//     excursionsApi._fetch('/orders').then(resp => {
//         const basket = resp
//         console.log(basket)

//     })
// }

