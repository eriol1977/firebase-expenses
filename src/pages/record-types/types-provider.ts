import { Type } from './type';

export const EXPENSE_TYPES: Type[] = [
    new Type("ABB","Abbigliamento","Abiti, biancheria, scarpe, accessori...","shirt"),
    new Type("ALI","Alimentari","Cibo e bevande","pizza"),
    new Type("DOC","Documenti","Spese dovute alla burocrazia","document"),
    new Type("IGB","Igiene e bellezza","Prodotti per l'igiene personale e della casa, prodotti di bellezza","rose"),
    new Type("INT","Intrattenimento","Libri, giochi, cinema, ristorante, giocattoli...","game-controller-b"),
    new Type("OGG","Oggetti e Strumenti","Oggetti e strumenti in generale, per la casa e non","home"),
    new Type("REG","Regali e offerte","Regali, offerte, donazioni...","heart"),
    new Type("SAL","Salute","Visite mediche e prodotti farmaceutici","pulse"),
    new Type("TRS","Trasporti","Benzina, autostrada, riparazioni auto, biglietti treno e autobus, assicurazione auto...","car"),
    new Type("TAS","Imposte/Tasse","Imposte e tasse in generale, bollo auto...","nuclear"),
    new Type("UTZ","Utenze","Luce, gas, telefono, internet, cellulare, condominio...","speedometer"),
    new Type("SCU","Scuola","Iscrizioni, corsi...","school")
];

export const INCOME_TYPES: Type[] = [
    new Type("AFF","Affitti","Affitti appartamenti, ecc.","home"),
    new Type("LIB","Libri","Proventi vendita libri","book"),
    new Type("REG","Regali","Regali ricevuti","cube"),
    new Type("STP","Stipendi","Stipendi, salari","person"),
    new Type("TIT","Titoli","Proventi da titoli: cedole, interessi, accredito capitale...","analytics"),
    new Type("TRF","Trasferimenti","Trasferimenti fondi: bonifici, capitale estero...","exit"),
    new Type("VEN","Vendite","Vendite di oggetti, ecc.","cart")
];
