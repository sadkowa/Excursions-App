class ExcursionsAPI {
    constructor() {
        this.url = 'http://localhost:3000'

    }

    loadExcursions(additionalPath) {
        this._fetch(additionalPath)
            .then(data => {
                this.insert(data)
            })
            .catch(err => console.error(err))

    }

    loadOrder() {
        return this._fetch('/orders')
            .then(data => {
                this.fillInSummary(data)
            })
            .catch(err => console.error(err))
    }

    fillInSummary(data) {
        const totalPriceElement = document.querySelector('.order__total-price-value')

        const totalSum = this.countTotalSum(data)
        totalPriceElement.textContent = totalSum + "PLN"

        this.fillInExcursionSummary(data)
    }

    countTotalSum(data) {
        let price = 0

        const basket = data
        basket.forEach(el => {

            price = price + el.adultPrice * el.adultNumber + el.childPrice * el.childNumber
            return price
        })
        return price
    }

    fillInExcursionSummary(data) {
        const summaryPanel = document.querySelector('.panel__summary')
        const summaryEl = document.querySelector('.summary__item--prototype')

        data.forEach(item => {
            const excursionItem = summaryEl.cloneNode(true)
            excursionItem.classList.remove('summary__item--prototype')

            const titleEl = excursionItem.querySelector('.summary__name')
            const totalEl = excursionItem.querySelector('.summary__total-price')
            const adultPriceEl = excursionItem.querySelector('.summary__adult-price')
            const childPriceEl = excursionItem.querySelector('.summary__child-price')
            const adultNumberEl = excursionItem.querySelector('.summary__adult-number')
            const childNumberEl = excursionItem.querySelector('.summary__child-number')

            const { title, adultPrice, adultNumber, childPrice, childNumber } = item

            // if(excursionItem)
            const sum = adultNumber * adultPrice + childNumber * childPrice
            titleEl.textContent = title
            totalEl.textContent = sum + "PLN"
            adultPriceEl.textContent = adultPrice + "PLN"
            childPriceEl.textContent = childPrice  + "PLN"
            adultNumberEl.textContent = adultNumber
            childNumberEl.textContent = childNumber

            summaryPanel.appendChild(excursionItem)
        })
    }

    insert(data) {
        const excursionsPanel = document.querySelector('.panel__excursions')
        const children = [...excursionsPanel.children]
        children.forEach(item => {
            if (!item.classList.contains('excursions__item--prototype'))
                excursionsPanel.removeChild(item)
        })
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

    add(data, additionalPath) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
        this._fetch(additionalPath, options)
            .then(() => {
                if (additionalPath === "/excursions") { this.loadExcursions(additionalPath) }
            })
            .catch(err => console.log(err))
            .finally(() => this.loadOrder())
    }

    remove(id, additionalPath) {
        const options = { method: "DELETE" }
        this._fetch(`${additionalPath}/${id}`, options)
            .catch(err => console.log(err))
            .finally(() => this.loadExcursions(additionalPath))
    }

    update(additionalPath, options, editableElementsArr, button) {

        this._fetch(additionalPath, options)
            .then(() => resp => console.log(resp))
            .catch(err => console.log(err))
            .finally(() => {
                if (additionalPath === "/excursions") {
                    button.value = 'edytuj'
                    editableElementsArr.forEach(el => el.contentEditable = false)
                }
                this.loadOrder()
            })
    }

    // updateOrder(){
    //     console.log('order')
    // }

    _fetch(additionalPath = '', options) {
        return fetch(this.url + additionalPath, options)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
    }



}

export default ExcursionsAPI;