jest.mock("../../../api/photo-data", () => ({
    savePhoto: jest.fn()
}));

import {
    mount,
    shallowMount
} from "@vue/test-utils";
import PhotoUpload from "../PhotoUpload"
import photoData from "../../../api/photo-data";
import {
    store
} from "../../../store";

const storeState = {
    storeState: {
        selectedLocation: {
            coordinates: {},
            tract: {
                links: [{
                    rel: "photos",
                    href: "/photos"
                }]
            },
            name: null
        },
        photos: [{
            ownerEmail: "email",
            ownerFirstName: "first",
            ownerLastName: "last"
        }]

    }
};

describe("PhotUpload", () => {

    test('submits proper form', () => {
        const wrapper = shallowMount(PhotoUpload);
        wrapper.setData(storeState);
        wrapper.vm.submitUpload();
        const photo = storeState.storeState.photos[0];
        const path = "/photos";
        expect(photoData.savePhoto).toBeCalledWith(path, photo, () => {});

    });
})