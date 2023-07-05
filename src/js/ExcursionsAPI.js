class ExcursionsAPI {
    constructor() {
        this.url = 'http://localhost:3000'
    }

    load(additionalPath) {
        this._fetch(additionalPath)
            .then(data => this._insert(data))
            .catch(err => console.error(err))
    }

    add(data, additionalPath) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
        this._fetch(additionalPath, options)
            .then(() => {
                if (additionalPath === "/excursions") this.load(additionalPath)
            })
            .catch(err => console.log(err))
    }

    remove(id, additionalPath) {
        const options = { method: "DELETE" }
        this._fetch(`${additionalPath}/${id}`, options)
            .catch(err => console.log(err))
            .finally(() => this.load(additionalPath))
    }

    update(additionalPath, options) {
        return this._fetch(additionalPath, options)
            .catch(err => console.log(err))
    }

    _fetch(additionalPath = '', options) {
        return fetch(this.url + additionalPath, options)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } return Promise.reject(resp);
            })
    }

    _insert(data) {
        const excursionsPanel = document.querySelector('.panel__excursions')

        this._clearExcursions(excursionsPanel)
        this._createNewExcursionElement(data, excursionsPanel)
    }

    _clearExcursions(excursionsPanel) {
        const children = [...excursionsPanel.children]
        children.forEach(item => {
            if (!item.classList.contains('excursions__item--prototype'))
                excursionsPanel.removeChild(item)
        })
    }
    _createNewExcursionElement(data, excursionsPanel) {
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
}

export default ExcursionsAPI;