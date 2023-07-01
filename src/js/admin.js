import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

const formFields = [
    { name: 'title', label: 'Nazwa', required: true },
    { name: 'description', label: 'Opis', required: true },
    { name: 'adultPrice', label: 'Cena dorosły', type: 'number', required: true },
    { name: 'childPrice', label: 'Cena dziecko', type: 'number', required: true }]

let errors = []

const excursionsApi = new ExcursionsAPI()
const excursionForm = document.querySelector('.form')

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('admin');

    excursionsApi.loadExcursions()

    if (excursionForm) {
        excursionForm.addEventListener('submit', handleForm)
    }
}

function handleForm(e) {
    e.preventDefault()
    errors = []

    const errorList = document.querySelector('.error-list')
    if (errorList) {
        errorList.innerHTML = ''
    }

    const dataExcursion = getNewExcursion()
    const formIsValid = validateForm()

    if (formIsValid) {
        addExcursionToJSON(dataExcursion)
    } else {
        createErrorMessage()
    }
}

function getNewExcursion() {
    const [titleInput, descriptionInput, adultPriceInput, childPriceInput] = excursionForm.elements

    const title = titleInput.value
    const description = descriptionInput.value
    const adultPrice = adultPriceInput.value
    const childPrice = childPriceInput.value

    const data = { title, description, adultPrice, childPrice }
    return data
}

function validateForm() {
    formFields.forEach(field => {
        const input = excursionForm.elements[field.name]
        const label = input.parentNode
        const value = input.value

        changeFontColor('black', label)

        if (field.required) {
            if (value.length === 0) {
                errors.push('Dane w polu "' + field.label + '" są wymagane')
                changeFontColor('red', label)
            }
        }
        if (field.type === 'number') {
            if (value < 0) {
                errors.push('Wartość w polu "' + field.label + '" nie może być mniejsza od 0')
                changeFontColor('red', label)
            }
        }
    })

    if (errors.length === 0) {
        return true
    } else return false
}

function changeFontColor(color, element) {
    element.style.color = color
}

function addExcursionToJSON(dataExcursion) {
    const options = {
        method: 'POST',
        body: JSON.stringify(dataExcursion),
        headers: { 'Content-Type': 'application/json' }
    }
    excursionsApi.addExcursion(options)
}

function createErrorMessage() {
    const errorList = document.querySelector('.error-list')

    errors.forEach(error => {
        const messageLi = document.createElement('li')
        messageLi.textContent = error
        changeFontColor('red', messageLi)
        errorList.appendChild(messageLi)
    })
}