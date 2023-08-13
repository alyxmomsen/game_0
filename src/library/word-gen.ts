


export default class WordGen {

    private static parts =  {
        1: [
          "Bel",
          "Dol",
          "Fel",
          "Gel",
          "Mel",
          "Nel",
          "Pal",
          "Sel",
          "Tel",
          "Vel",
          "Zel",
          "Cal",
          "Del",
          "Fel",
          "Gil"
        ],
        2: [
          "and",
          "bon",
          "con",
          "don",
          "fon",
          "gon",
          "mon",
          "pon",
          "son",
          "ton",
          "von",
          "zon",
          "col",
          "dol",
          "fol"
        ],
        3: [
          "ana",
          "bia",
          "cia",
          "dia",
          "eia",
          "fia",
          "gia",
          "hia",
          "iia",
          "jia",
          "kia",
          "lia",
          "mia",
          "nia",
          "pia"
        ]
      }

    1:string ;
    2:string ;
    3:string ;

    gen(){

        this[1] = WordGen.parts[1][Math.floor(Math.random() * WordGen.parts[1].length)] ;
        this[2] = WordGen.parts[2][Math.floor(Math.random() * WordGen.parts[2].length)] ;
        this[3] = WordGen.parts[3][Math.floor(Math.random() * WordGen.parts[3].length)] ;

        return `${this[1]}${this[2]}${this[3]}` ;
    }

    constructor () {
        this[1] = '' ;
        this[2] = '' ;
        this[3] = '' ;
    }
}