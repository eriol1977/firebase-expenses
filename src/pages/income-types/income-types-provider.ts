import { IncomeType } from './income-type';

export const INCOME_TYPES: IncomeType[] = [
    new IncomeType("AFF","Affitti","Affitti appartamenti, ecc.","home"),
    new IncomeType("LIB","Libri","Proventi vendita libri","book"),
    new IncomeType("REG","Regali","Regali ricevuti","cube"),
    new IncomeType("STP","Stipendi","Stipendi, salari","person"),
    new IncomeType("TIT","Titoli","Proventi da titoli: cedole, interessi, accredito capitale...","analytics"),
    new IncomeType("TRF","Trasferimenti","Trasferimenti fondi: bonifici, capitale estero...","exit"),
    new IncomeType("VEN","Vendite","Vendite di oggetti, ecc.","cart")
];
