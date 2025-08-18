import {lastPeriods} from "../api/dlt-service";

export const dltPeriodMixin = {
    data() {
        return {
            periods: [],
        };
    },
    methods: {
        lastPeriods() {
            lastPeriods({
                type: 'dlt',
                size: 50
            }).then(data => this.periods = data || []);
        },
    },
    mounted() {
        this.lastPeriods();
    }
};
