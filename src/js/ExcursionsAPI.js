class ExcursionsAPI {
    constructor() {
        this.url = 'http://localhost:3000'
    }

    load(additionalPath) {
        return this._fetch(additionalPath)
            .catch(err => console.error(err))
    }

    add(data, additionalPath) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
        return this._fetch(additionalPath, options)
            .catch(err => console.log(err))
    }

    remove(id, additionalPath) {
        const options = { method: "DELETE" }
        return this._fetch(`${additionalPath}/${id}`, options)
            .catch(err => console.log(err))
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
}

export default ExcursionsAPI;