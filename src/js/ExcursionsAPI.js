class ExcursionsAPI {
    constructor() {
        this.url = 'http://localhost:3000'

    }

    loadExcursions(additionalPath) {
        this._fetch(additionalPath)
            .then(data => {
                // this.fillInSummary()
                this.insert(data)
            })
            .catch(err => console.error(err))
       
    }

    loadOrder() {
        return this._fetch('/orders')
            .then(data => {
                // this.fillInSummary(data)
                return data
            })
            .catch(err => console.error(err))
    }

    // fillInSummary(data) {
    //     const totalPriceElement = document.querySelector('.order__total-price-value')
    //     const excursionPriceElement = document.querySelector('.summary__total-price')

    //     const totalSum = this.countTotalSum(data)
    //     totalPriceElement.textContent = totalSum + "PLN"

    //     console.log(totalSum)
    // }

    // countTotalSum(data) {
    //     let price = 0

    //     const basket = data
    //     basket.forEach(el => {

    //         price = price + el.adultPrice * el.adultNumber + el.childPrice * el.childNumber
    //         return price
    //     })
    //     // console.log(basket)


    //     return price
    // }

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