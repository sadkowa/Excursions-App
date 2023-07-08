import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

import formFields from './formFields.js'

let errors = []

const excursionsApi = new ExcursionsAPI()
const excursionForm = document.querySelector('.form')

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('admin');

    loadExcursions()
    addExcursion()
    removeExcursion()
    updateExcursion()
}

function loadExcursions() {
    excursionsApi.load('/excursions')
        .then(data => insertExcursions(data))
}
function insertExcursions(data) {
    const excursionsPanel = document.querySelector('.panel__excursions')

    clearExcursions(excursionsPanel)
    createNewExcursionElement(data, excursionsPanel)
}

function clearExcursions(excursionsPanel) {
    const children = [...excursionsPanel.children]
    children.forEach(item => {
        if (!item.classList.contains('excursions__item--prototype'))
            excursionsPanel.removeChild(item)
    })
}
function createNewExcursionElement(data, excursionsPanel) {
    const excursionPrototype = document.querySelector('.excursions__item--prototype')

    data.forEach(item => {
        const newExcursion = excursionPrototype.cloneNode(true)
        newExcursion.dataset.id = item.id
        const title = newExcursion.querySelector('.excursions__title')
        const description = newExcursion.querySelector('.excursions__description')
        const adultPrice = newExcursion.querySelector('.excursions__adult-price')
        const childPrice = newExcursion.querySelector('.excursions__child-price')

        title.textContent = item.title
        description.textContent = item.description
        adultPrice.textContent = Number(item.adultPrice)
        childPrice.textContent = Number(item.childPrice)

        newExcursion.classList.remove('excursions__item--prototype')

        excursionsPanel.appendChild(newExcursion)
    })
}

function addExcursion() {
    if (excursionForm) {
        excursionForm.addEventListener('submit', (e) => {
            e.preventDefault()
            clearErrorList()

            const dataExcursion = getNewExcursion()
            const formIsValid = validateForm()

            if (formIsValid) {
                addExcursionToJSON(dataExcursion)
            } else {
                createErrorMessage()
            }
        })
    }
}

function clearErrorList() {
    errors = []

    const errorList = document.querySelector('.error-list')
    if (errorList) {
        errorList.innerHTML = ''
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
    excursionsApi.add(dataExcursion, '/excursions')
        .then(() => loadExcursions())
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

function removeExcursion() {
    const excursionsList = document.querySelector('.panel__excursions')
    excursionsList.addEventListener('click', e => {
        e.preventDefault()

        if (e.target.value === 'usuń') {
            const form = e.target.parentNode.parentNode
            const liItem = form.parentNode

            const id = liItem.dataset.id
            excursionsApi.remove(id, '/excursions')
                .then(() => loadExcursions())
        }
    })
}

function updateExcursion() {
    const excursionsList = document.querySelector('.panel__excursions')
    excursionsList.addEventListener('click', e => {
        if (e.target.classList.contains('excursions__field-input--update')) {
            const form = e.target.parentNode.parentNode
            const liItem = form.parentNode

            const button = liItem.querySelector('.excursions__field-input--update')
            const editableElements = liItem.querySelectorAll('.excursions--editable')

            const editableElementsArr = [...editableElements]
            const isEditable = checkIfIsEditable(editableElementsArr)

            if (isEditable) {
                const id = liItem.dataset.id

                const data = createDataObj(editableElementsArr)

                const options = {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                }

                if (isNaN(data.adultPrice) || isNaN(data.childPrice)) {
                    alert('Pole "dorosły" oraz pole "dziecko" muszą być liczbą')
                } else {
                    excursionsApi.update(`/excursions/${id}`, options)
                        .then(() => {
                            button.value = 'edytuj'
                            editableElementsArr.forEach(el => el.contentEditable = false)
                        })
                }
            }
            else {
                button.value = 'zapisz'
                editableElementsArr.forEach(el => el.contentEditable = true)
            }
        }
    })
}

function checkIfIsEditable(editableElementsArr) {
    return editableElementsArr.every(el => el.isContentEditable)
}

function createDataObj([titleEl, descriptionEl, adultPriceEl, childPriceEl]) {
    const data = {
        title: titleEl.textContent,
        description: descriptionEl.textContent,
        adultPrice: Number(adultPriceEl.textContent),
        childPrice: Number(childPriceEl.textContent)
    }
    return data
}
