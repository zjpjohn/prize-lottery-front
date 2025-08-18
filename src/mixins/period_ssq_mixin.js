import {lastPeriods} from "../api/dlt-service";

export const ssqPeriodMixin = {
    data() {
        return {
            periods: [],
        };
    },
    methods: {
        lastPeriods() {
            lastPeriods({
                type: 'ssq',
                size: 50
            }).then(data => this.periods = data || []);
        },
    },
    mounted() {
        this.lastPeriods();
    }
};
