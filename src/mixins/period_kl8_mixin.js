import {lastPeriods} from "../api/dlt-service";

export const kl8PeriodMixin = {
    data() {
        return {
            periods: [],
        };
    },
    methods: {
        lastPeriods() {
            lastPeriods({
                type: 'kl8',
                size: 50
            }).then(data => this.periods = data || []);
        },
    },
    mounted() {
        this.lastPeriods();
    }
};
