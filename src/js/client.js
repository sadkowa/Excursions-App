import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

const excursionsApi = new ExcursionsAPI()
let basket = []
let errors = []

document.addEventListener('DOMContentLoaded', init)

function init() {
    console.log('client');

    excursionsApi.load('/excursions')
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
                clearExcursionForm(e)
            }
        }
    })
}

function clearExcursionForm(e) {
    const form = e.target.parentNode.parentNode
    const [adultPriceInput, childPriceInput] = form.elements
    adultPriceInput.value = ''
    childPriceInput.value = ''
}

function getOrderData(e) {
    const form = e.target.parentNode.parentNode
    const liItem = form.parentNode
    const title = liItem.querySelector('.excursions__title')
    const adultPrice = form.querySelector('.excursions__adult-price')
    const childPrice = form.querySelector('.excursions__child-price')
    const [adultPriceInput, childPriceInput] = form.elements

    const data = {
        title: title.textContent,
        adultPrice: adultPrice.textContent,
        adultNumber: Number(adultPriceInput.value),
        childPrice: childPrice.textContent,
        childNumber: Number(childPriceInput.value)
    }

    if (data.adultNumber === 0 && data.childNumber === 0) {
        return alert('Uzupełnij pole "dorosły" lub "dziecko"')
    }
    return data
}

function fillInSummary(data) {
    fillInTotalSum()
    fillInExcursionSummary(data)
}

function fillInTotalSum() {
    const totalPriceElement = document.querySelector('.order__total-price-value')
    let price = 0

    basket.forEach(el => {
        price = price + el.adultPrice * el.adultNumber + el.childPrice * el.childNumber
    })
    totalPriceElement.textContent = price + "PLN"
}

function fillInExcursionSummary() {
    const summaryPanel = document.querySelector('.panel__summary')
    const summaryEl = document.querySelector('.summary__item--prototype')
    const sumChildren = [...summaryPanel.children]
    sumChildren.forEach(child => {
        if (!child.classList.contains('summary__item--prototype')) {
            summaryPanel.removeChild(child)
        }
    })
    createExcursionSummaryElement(summaryEl, summaryPanel)
}

function createExcursionSummaryElement(summaryEl, summaryPanel) {
    basket.forEach(item => {
        const excursionItem = summaryEl.cloneNode(true)
        excursionItem.classList.remove('summary__item--prototype')

        createExcursionElement(item, excursionItem, summaryPanel)
    })
}

function createExcursionElement(item, excursionItem, summaryPanel) {
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
}

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

                basket.splice(deletedItemIndex, 1)
            }
        })
    }
}

function sendOrderData() {

    const form = document.querySelector('.panel__order')

    form.addEventListener('click', e => {
        e.preventDefault()

        if (e.target.value === "zamawiam") {
            clearErrorList()

            const totalSumInput = document.querySelector('.order__total-price-value')
            const totalSum = totalSumInput.textContent
            const [nameInput, emailInput] = form.elements

            const name = nameInput.value
            const email = emailInput.value

            checkConditions(name, email)

            const isValid = formValidate()

            if (isValid) {
                const data = {
                    name,
                    email,
                    totalSum,
                    orderDetails: basket
                }

                excursionsApi.add(data, '/orders')
                clearOrderForm(nameInput, emailInput, totalSumInput)
                console.log('Zamówienie zostało wysłane')
                alert('Zamówienie zostało wysłane')
            }
        }
    })

    function clearErrorList() {
        errors = []

        const section = document.querySelector('.panel__form')
        const errorElements = document.querySelectorAll('.order__error')

        errorElements.forEach(err => {
            section.removeChild(err)
        })
    }
}

function checkConditions(name, email) {
    if (name.length === 0) {
        errors.push('Pole "imię i nazwisko" nie może być puste')
    }
    if (!email.includes('@')) {
        errors.push('Pole "email" nie może być puste i musi zawierać znak "@"')
    }
    if (basket.length === 0) {
        errors.push("Brak wycieczek w koszyku")
    }
}

function formValidate() {
    if (errors.length === 0 && basket.length !== 0) return true
    else {
        createErrorMessage()
        return false
    }
}
``
function clearOrderForm(nameInput, emailInput, totalSumInput) {
    const summaryPanel = document.querySelector('.panel__summary')
    summaryPanel.innerHTML = ''

    basket = []
    nameInput.value = ''
    emailInput.value = ''
    totalSumInput.textContent = 0 + "PLN"
}

function createErrorMessage() {
    const section = document.querySelector('.panel__form')

    errors.forEach(err => {
        const messageElement = document.createElement('li')
        messageElement.classList.add('order__error')
        messageElement.textContent = err
        section.appendChild(messageElement)
    })
}