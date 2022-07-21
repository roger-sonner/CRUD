import {Cliente} from "./cliente";
import {ItemNotaFiscal} from "./item-nota-fiscal";

export class NotaFiscal {
  id: bigint | undefined;
  numero: bigint | undefined;
  data: Date | undefined;
  itemNotaFiscal: ItemNotaFiscal | undefined;
  cliente: Cliente | undefined;

 /*
  {
  "id": 1,
  "numero": 100,
  "cliente": {
    "id": 1,
    "codigo": 100,
    "nome": "Roger Barbosa"
  },
  "itemNotaFiscal": [
    {
      "id": 1,
      "sequencial": 1,
      "produto": {
        "id": 1,
        "codigo": 200,
        "descricao": "TV 50\" Samsung",
        "valorUnitario": 3589.00
      },
      "quantidade": 5.0,
      "valorTotal": 50.00,
      "notaFiscal": 1
    }
  ],
  "data": "2022-07-18"
}
]
*/

}
