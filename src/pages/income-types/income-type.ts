export class IncomeType {
    code: string;   // AFF
    description: string;    // Affitto
    notes: string;  // bla bla bla...
    icon: string;   // home
    
    constructor(code: string, description: string, notes: string, icon: string) {
        this.code = code;
        this.description = description;
        this.notes = notes;
        this.icon = icon;
    }
}


