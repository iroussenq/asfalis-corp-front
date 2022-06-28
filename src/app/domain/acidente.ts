import { Condutor } from './condutor';
import { Policial } from './policial';
import { Multa } from './multa';
import { Rodovia } from './rodovia';
export interface Acidente {
  id: String;
  rodovia: Rodovia;
  multas: Multa[];
  policial: Policial;
  condutor: Condutor;
  dataDoAcidente: Date;
}
