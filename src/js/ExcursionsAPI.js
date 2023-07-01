class ExcursionsAPI {
    constructor() {
        this.url = 'http://localhost:3000'

    }

    loadExcursions() {
        this._fetch('/excursions')
            .then(data => {
                console.log(data)
                this.insertExcursion(data)
            })
            .catch(err => console.log(err))
    }

    addExcursion(options) {
        this._fetch('/excursions', options)
            .then(() => this.loadExcursions())
            .catch(err => console.log(err))
    }

    insertExcursion(data) {
        const excursionsPanel = document.querySelector('.panel__excursions')
        const children = [...excursionsPanel.children]
        children.forEach(item => {
            console.log(item.classList.contains('excursions__item--prototype'))
            if (!item.classList.contains('excursions__item--prototype'))
                excursionsPanel.removeChild(item)
        })
        const excursionPrototype = document.querySelector('.excursions__item--prototype')

        data.forEach(item => {
            const newExcursion = excursionPrototype.cloneNode(true)
            const title = newExcursion.querySelector('.excursions__title')
            const description = newExcursion.querySelector('.excursions__description')
            const adultPrice = newExcursion.querySelector('.excursions__adult-price')
            const childPrice = newExcursion.querySelector('.excursions__child-price')

            title.textContent = item.title
            description.textContent = item.description
            adultPrice.textContent = item.adultPrice
            childPrice.textContent = item.childPrice
            newExcursion.classList.remove('excursions__item--prototype')

            excursionsPanel.appendChild(newExcursion)
        })
    }

    removeExcursion(){
        
    }

    _fetch(additionalPath = '', options) {
        return fetch(this.url + additionalPath, options)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
    }

    // getExcursion() {
    //     fetch('http://localost:3000/excursions')
    //         .then(resp => console.log(resp))
    //         .catch(err => console.log(err))
    // }


}

export default ExcursionsAPI;