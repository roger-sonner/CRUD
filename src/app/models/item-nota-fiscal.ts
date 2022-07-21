import {Produto} from "./produto";
import {NotaFiscal} from "./nota-fiscal";

export class ItemNotaFiscal {

  id: bigint | undefined;
  notaFiscal: NotaFiscal | undefined;
  sequencial: number | undefined;
  produto: Produto | undefined;
  quantidade: number | undefined;
  valorTotal: number | undefined

}

export class ItemNotaFiscal1 {

  id: bigint | undefined;
  notaFiscal: number | undefined;
  sequencial: number | undefined;
  produto: number | undefined;
  quantidade: number | undefined;
  valorTotal: number | undefined

}

