import {
    location,
    coordinates
}
from "./Location";

export const store = {
    state: {
        addressSearchString: null,
        isDoneTyping: null,
        addressSearchType: null,
        selectedLocation: new location(null, new coordinates())
    },
    clearSearchString() {
        this.state.addressSearchString = null;
    },
    updateSearchString(input) {
        this.state.addressSearchString = input;
    },
    updateTypingTracker(isDone) {
        this.state.isDoneTyping = isDone;
    },
    setAddressSearchType(type) {
        this.state.addressSearchtType = type;
    },
    setSelectedLocation(location) {
        this.state.selectedLocation = location;
    }
};