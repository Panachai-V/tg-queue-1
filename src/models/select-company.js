export class StatusCompany {
    constructor() {
        this.type = "tag";
        this.value = 0;
        this.text = '';
        this.classer = '';
    }

    setStatusCompany(status) {
        this.value = status;

        if (status == 0) {
            this.text = "รอการ Matching";
            this.classer = "ss-tag-danger";
        } else if (status == 1) {
            this.text = "รอการชำระเงิน";
            this.classer = "ss-tag-info";
        } else if (status == 2) {
            this.text = "รอคิวการรับ";
            this.classer = "ss-tag-info";
        } else if (status == 3) {
            this.text = "รอยืนยันคิว";
            this.classer = "ss-tag-danger";
        } else if (status == 4) {
            this.text = "กำลังดำเนินการ";
            this.classer = "ss-tag-warning";
        } else if (status == 5) {
            this.text = "ดำเนินการเสร็จสิ้น";
            this.classer = "ss-tag-success";
        }
    }
}

export class ConditionSelectViewJob {
    constructor(page, limit, sort_by, order, status) {
        this.page = page;
        this.limit = limit;
        this.sort_by = sort_by;
        this.order = order;
        this.status = status;
    }
}

export class FilterStatus {
    constructor(hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter, prevPage, totalDocs, totalPages, totalrows) {
        this.hasNextPage = hasNextPage;
        this.hasPrevPage = hasPrevPage;
        this.limit = limit;
        this.nextPage = nextPage;
        this.page = page;
        this.pagingCounter = pagingCounter;
        this.prevPage = prevPage;
        this.totalDocs = totalDocs;
        this.totalPages = totalPages;
        this.totalrows = totalrows
    }
}