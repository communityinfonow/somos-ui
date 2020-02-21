const PERCENT = "percent";
const CURRENCY = "currency";
const NUMERIC = "numeric";
const AVERAGE = "average";


export default {
    formatData(value, valueFormat) {
        switch (valueFormat) {
            case PERCENT:
                return value.toFixed(1) + "%";
            case CURRENCY:
                return "$" + value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,');
            case NUMERIC:
                return value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,');
            default:
                return value.toFixed(1);
        }
    }
}