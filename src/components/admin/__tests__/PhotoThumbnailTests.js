jest.mock("../../../api/photo-data", () => ({
    savePhoto: jest.fn()
}));

import Vue from "vue";
import Vuetify from "vuetify"

import {
    mount,
    shallowMount,
    createLocalVue
} from "@vue/test-utils";
import PhotoThumbnail from "../photos/PhotoThumbnail.vue";
import photoData from "../../../api/photo-data"

Vue.use(Vuetify);


const mockData = {
    photo: {
        fileName: "photo.png",
        approved: false,
        path: "",
        censusTractId: 1,
        description: "Description",
        _links: {
            self: {
                href: "http//me"
            },
            'photo-file': {
                href: "http//meFile"
            }
        }
    }
}

const localVue = createLocalVue()

describe("PhotoThumbnail", () => {
    let vuetify;
    let wrapper;
    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = mount(PhotoThumbnail, {
            localVue,
            vuetify,
            methods: {
                descriptionBlurHandler: jest.fn()
            },
            propsData: {
                "photoObj": mockData.photo
            }
        });
    });

    test('descriptionInputExists', () => {
        expect(wrapper.contains('#description')).toBe(true);
    })

    test('editSubmissionMatches', () => {
        var descriptionInput = wrapper.find('#description');
        descriptionInput.value = "new description";
        descriptionInput.trigger('input');
        wrapper.find('.v-textarea').trigger('blur');
        expect(descriptionInput.value).toBe("new description");
        // expect(wrapper.vm.photo.description).toBe("new description");
        expect(wrapper.vm.descriptionBlurHandler).toBeCalled();
        expect(photoData.savePhoto).toBeCalledWith(wrapper.vm.selfPath, wrapper.vm.photo, expect.anything());

    })

    it('save handler handles not found')
})