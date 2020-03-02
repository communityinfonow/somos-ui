import {
    coordinates,
    location
} from "./Location";

export const store = {
    state: {
        addressSearchString: null,
        isDoneTyping: null,
        addressSearchType: null,
        searchResults: [],
        selectedLocation: new location(null, null, null, new coordinates(null, null)),
        contactFirstName: null,
        contactLastName: null,
        contactEmail: null,
        photo: null,
        censusTracts: [],
        boundaries: [],
        dataFeatures: [],
        photoDescription: null,
        appLinks: null
    },
    clearSearchString() {
        this.state.addressSearchString = null;
    },
    setAppLinks(appLinks) {
        this.state.appLinks = appLinks
    },
    updateSearchString(input) {
        this.state.addressSearchString = input;
    },
    updateTypingTracker(isDone) {
        this.state.isDoneTyping = isDone;
    },
    setAddressSearchType(type) {
        this.state.addressSearchType = type;
    },
    setSelectedLocation(location) {
        this.state.selectedLocation = location;
    },
    setPhotoDescription(photoDescription) {
        this.state.photoDescription = photoDescription;
    },
    clearSelectedLocation() {
        this.state.selectedLocation = new location(null, null, null, new coordinates(null, null));
    },
    setSelectedLocationTract(tract) {
        this.state.selectedLocation.tract = tract;
    },
    setContactFirstName(firstName) {
        this.state.contactFirstName = firstName;
    },
    setContactLastName(lastName) {
        this.state.contactLastName = lastName;
    },
    setContactEmail(email) {
        this.state.contactEmail = email;
    },
    setPhoto(photo) {
        this.state.photo = photo;
    },
    setSearchResults(results) {
        this.state.searchResults = results;
    },
    setCensusTracts(censusTracts) {
        this.state.censusTracts = censusTracts;
    },
    setBoundaries(boundaries) {
        this.state.boundaries = boundaries;
    },
    setDataFeatures(dataFeatures) {
        this.state.dataFeatures = dataFeatures;
    }
};

export const authenticationStore = {
    state: {
        userRoles: []
    },
    setUserRoles(roles) {
        this.state.userRoles = roles;
    }

};

export const languageStore = {
    languages: [{
            lang: 'english',
            code: 'en',
            label: 'English'
        },
        {
            lang: 'spanish',
            code: 'es',
            label: 'Espa&ntilde;ol'
        }
    ],
    state: {
        languageCode: 'en'
    },
    setLanguageCode(language) {
        this.state.languageCode = language;
    }

}

export const exploreDataStore = {
    state: {

    }
}