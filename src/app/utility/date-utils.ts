export const MONTHS: any[] = [
    {
        number: "01",
        name: "Gennaio"
    },
    {
        number: "02",
        name: "Febbraio"
    },
    {
        number: "03",
        name: "Marzo"
    },
    {
        number: "04",
        name: "Aprile"
    },
    {
        number: "05",
        name: "Maggio"
    },
    {
        number: "06",
        name: "Giugno"
    },
    {
        number: "07",
        name: "Luglio"
    },
    {
        number: "08",
        name: "Agosto"
    },
    {
        number: "09",
        name: "Settembre"
    },
    {
        number: "10",
        name: "Ottobre"
    },
    {
        number: "11",
        name: "Novembre"
    },
    {
        number: "12",
        name: "Dicembre"
    }
];

export class DateUtils {
    
    static getThisYearNumber(): string {
        return new Date().toISOString().substring(0, 4);
    }

    static getThisMonthNumber(): string {
        return new Date().toISOString().substring(5, 7);
    }

    static getLastMonthNumber(): string {
        var thisMonthNumber = DateUtils.getThisMonthNumber();
        if(thisMonthNumber == '01')
            return '01';
        var lastMonthNum = parseInt(thisMonthNumber) - 1;
        return (lastMonthNum < 10 ? "0" + lastMonthNum : "" + lastMonthNum);
    }

    static getNextMonthNumber(): string {
        var thisMonthNumber = DateUtils.getThisMonthNumber();
        if(thisMonthNumber == '12')
            return '12';
        var nextMonthNum = parseInt(thisMonthNumber) + 1;
        return (nextMonthNum < 10 ? "0" + nextMonthNum : "" + nextMonthNum);
    }

    static getMonthsUntil(until: number): any[] {
        var monthsUntil: any[] = [];
        for(let month of MONTHS)
            if(parseInt(month.number) < until)
                monthsUntil.push(month);
        return monthsUntil;
    }

    static getMonthsUntilLast(): any[] {
        var thisMonthNumber = parseInt(DateUtils.getThisMonthNumber());
        return DateUtils.getMonthsUntil(thisMonthNumber);
    }

    static getMonthsUntilThis(): any[] {
        var thisMonthNumber = parseInt(DateUtils.getThisMonthNumber());
        return DateUtils.getMonthsUntil(++thisMonthNumber);
    }

}



