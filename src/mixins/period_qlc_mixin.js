import {lastPeriods} from "../api/dlt-service";

export const qlcPeriodMixin = {
    data() {
        return {
            periods: [],
        };
    },
    methods: {
        lastPeriods() {
            lastPeriods({
                type: 'qlc',
                size: 50
            }).then(data => this.periods = data || []);
        },
    },
    mounted() {
        this.lastPeriods();
    }
};
