import {
    mount
} from "@vue/test-utils";
import AddressTypeSelector from "C:/Users/Joe/Documents/workspace/visualizing-healthy-lives/src/components/shared/address-search/AddessTypeSelector.vue";

describe("AddressTypeSelector", () => {
    const wrapper = mount(AddressTypeSelector);

    test('default is address', () => {
        expect(wrapper.vm.selected).toBe("address");
    })

    test('click should update selection', () => {
        expect(wrapper.vm.selected).toBe("address");
        const placeInput = wrapper.find("#place-selector");
        placeInput.trigger('click');
        expect(wrapper.vm.selected).toBe("place");
    })
})