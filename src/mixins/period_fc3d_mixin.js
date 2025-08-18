import {lastPeriods} from "../api/dlt-service";

export const fc3dPeriodMixin = {
    data() {
        return {
            periods: []
        };
    },
    methods: {
        lastPeriods() {
            lastPeriods({
                type: 'fsd',
                size: 50
            }).then(data => this.periods = data || []);
        },
    },
    mounted() {
        this.lastPeriods();
    }
};
