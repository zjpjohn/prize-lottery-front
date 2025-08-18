import {lastPeriods} from "../api/dlt-service";

export const pl3PeriodMixin = {
    data() {
        return {
            periods: [],
        };
    },
    methods: {
        lastPeriods() {
            lastPeriods({
                type: 'pls',
                size: 50
            }).then(data => this.periods = data || []);
        },
    },
    mounted() {
        this.lastPeriods();
    }
};
