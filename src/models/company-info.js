export default class Overview {

    constructor(ff_count=0, state_0=0, state_1=0, state_2=0, state_3=0, state_4=0, state_5=0, state_6=0, driver_count=0, company_count=0) {
        this.ff_count = ff_count;

        this.state_0 = state_0;
        this.job_detail_0 = []

        this.state_1 = state_1;
        this.job_detail_1 = []

        this.state_2 = state_2;
        this.job_detail_2 = []

        this.state_3 = state_3;
        this.job_detail_3 = []

        this.state_4 = state_4;
        this.job_detail_4 = []

        this.state_5 = state_5;
        this.job_detail_5 = []

        this.state_6 = state_6;

        this.driver_count = driver_count;

        this.company_count = company_count;

        let tempObject = {
            awbNumber: { 
                type: 'link', text: '-',
                href: '/forwarder/job-request-view'
            },
            customsEntryNumber: { text: '-' },
            customsEntryNumberDate: { text: '-' },
            date: { text: '-' },
            dockNumber: {text: "-"},
            flightNumber: { text: '-' },
            hwbSerialNumber: { text: '-' },
            jobNumber: { text: '-' },
            numberOfPieces: {text: "-"},
            options: {
                type: 'options',
                view: { type: 'link', href: '/forwarder/job-request-view/' }
            },
            pickupTime: {text: "-.-"},
            status: { type: 'tag', value: 0, text: '-', classer: '-' },
            truckNumber: {text: "-"}
        }

        this.job_detail_0.push(tempObject)
        this.job_detail_1.push(tempObject)
        this.job_detail_2.push(tempObject)
        this.job_detail_3.push(tempObject)
        this.job_detail_4.push(tempObject)
        this.job_detail_5.push(tempObject)
    }

    
}