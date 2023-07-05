import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

const excursionsApi = new ExcursionsAPI()
const basket = []

document.addEventListener('DOMContentLoaded', init())

function init() {
    console.log('client');

    excursionsApi.loadExcursions('/excursions')

    addItemToBasket()
    removeItemFromBasket()
    sendOrderData()
}


function addItemToBasket() {
    const excursionList = document.querySelector('.panel__excursions')

    excursionList.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.value === 'dodaj do zamówienia') {
            const data = getOrderData(e)

            if (data) {
                const existedItemIndex = basket.findIndex(item => item.title === data.title)

                if (existedItemIndex !== -1) {
                    basket[existedItemIndex].adultNumber += data.adultNumber
                    basket[existedItemIndex].childNumber += data.childNumber
                } else {
                    basket.push(data)
                }
                fillInSummary(data)
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

    if (adultPriceInput.value === '' && childPriceInput.value === '') {
        return alert('Uzupełnij pole "dorosły" lub "dziecko"')
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

function fillInSummary(data) {
    const totalPriceElement = document.querySelector('.order__total-price-value')

    const totalSum = countTotalSum()
    totalPriceElement.textContent = totalSum + "PLN"

    fillInExcursionSummary(data)
}

function countTotalSum() {
    let price = 0

    basket.forEach(el => {
        price = price + el.adultPrice * el.adultNumber + el.childPrice * el.childNumber
    })
    return price
}

function fillInExcursionSummary(data) {
    const summaryPanel = document.querySelector('.panel__summary')
    const summaryEl = document.querySelector('.summary__item--prototype')
    const sumChildren = [...summaryPanel.children]
    sumChildren.forEach(child => {
        if (!child.classList.contains('summary__item--prototype')) {
            summaryPanel.removeChild(child)
        }
    })

    basket.forEach(item => {
        const excursionItem = summaryEl.cloneNode(true)
        excursionItem.classList.remove('summary__item--prototype')

        const titleEl = excursionItem.querySelector('.summary__name')
        const totalEl = excursionItem.querySelector('.summary__total-price')
        const adultPriceEl = excursionItem.querySelector('.summary__adult-price')
        const childPriceEl = excursionItem.querySelector('.summary__child-price')
        const adultNumberEl = excursionItem.querySelector('.summary__adult-number')
        const childNumberEl = excursionItem.querySelector('.summary__child-number')

        let { title, adultPrice, adultNumber, childPrice, childNumber } = item

        const sum = adultNumber * adultPrice + childNumber * childPrice
        titleEl.textContent = title
        totalEl.textContent = sum + "PLN"
        adultPriceEl.textContent = adultPrice + "PLN"
        childPriceEl.textContent = childPrice + "PLN"
        adultNumberEl.textContent = adultNumber
        childNumberEl.textContent = childNumber

        summaryPanel.appendChild(excursionItem)
    })
}



// function sendOrderData(resp, data) {
//     const basketList = resp

//     const existedItemIndex = basketList.findIndex((item) => {
//         return item.title === data.title
//     })
//     if (existedItemIndex === -1) {
//         excursionsApi.add(data, '/orders')
//     }
//     else {
//         basketList.forEach(item => {
//             if (item.title === data.title) {
//                 data.adultNumber += item.adultNumber
//                 data.childNumber += item.childNumber

//                 const options = {
//                     method: "PUT",
//                     body: JSON.stringify(data),
//                     headers: { "Content-Type": "application/json" }
//                 }
//                 excursionsApi.update(`/orders/${item.id}`, options)
//             }
//         })
//     }
// }

function removeItemFromBasket() {
    const panelForm = document.querySelector('.panel__form')

    if (panelForm) {
        panelForm.addEventListener('click', e => {
            e.preventDefault()
            if (e.target.title === 'usuń') {
                const currentSummaryItem = e.target.parentNode.parentNode
                const currentTitle = currentSummaryItem.querySelector('.summary__name').textContent
                const panelSummary = currentSummaryItem.parentNode

                panelSummary.removeChild(currentSummaryItem)
                const deletedItemIndex = basket.findIndex(item => item.title === currentTitle)
                console.log(deletedItemIndex)
                console.log(basket)
                basket.splice(deletedItemIndex, 1)
                console.log(basket)

            }
        })
    }

}

function sendOrderData() {

    const form = document.querySelector('.panel__order')
    console.log(form) // form.panel__order.order

    form.addEventListener('submit', e => {
        e.preventDefault()
        console.log(e)
    })

    // const options = {
    //     method: "PUT",
    //     body: JSON.stringify(data),
    //     headers: { "Content-Type": "application/json" }
    // }
    // excursionsApi.update(`/orders`, options)



}
