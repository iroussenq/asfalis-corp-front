import { Veiculo } from './veiculo';
import { Condutor } from './condutor';
import { Policial } from './policial';
import { Rodovia } from './rodovia';
export interface Acidente {
  id: string;
  rodovia: Rodovia;
  policial: Policial;
  veiculo: Veiculo;
  condutor: Condutor;
  dataDoAcidente: Date;
  relatorio: string;
  casualidades: number;
}
