jest.mock("../../../api/photo-data", () => ({
    savePhoto: jest.fn()
}));
import Vue from "vue";
import Vuetify from "vuetify";
import {
    mount,
    shallowMount
} from "@vue/test-utils";
import PhotoUpload from "../PhotoUpload"
import photoData from "../../../api/photo-data";
import {
    store
} from "../../../store";
Vue.use(Vuetify);
const storeState = {
    storeState: {
        selectedLocation: {
            coordinates: {},
            tract: {
                _links: {
                    "photos": {
                        href: "/photos"
                    }

                }
            },
            name: null
        },
        photos: [{
            ownerEmail: "email",
            ownerFirstName: "first",
            ownerLastName: "last",
            id: 1
        }]

    }
};

describe("PhotoUpload", () => {

    test('submits proper form', () => {
        const wrapper = shallowMount(PhotoUpload);
        wrapper.setData(storeState);
        wrapper.vm.submitUpload();
        const photo = storeState.storeState.photos[0];
        const path = "/photos/1";
        expect(photoData.savePhoto).toBeCalledWith(path, photo, expect.anything());

    });
})