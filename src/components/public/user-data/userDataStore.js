export const userDataStore = {
    state: {
        address: null,
        tract: null
    },
    setTract(tract) {
        this.state.tract = tract;
    },
    setAddress(address) {
        this.state.address = address;
    }
}