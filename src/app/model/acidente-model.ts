import { VeiculoModel } from './veiculo-model';
import { RodoviaModel } from './rodovia-model';
import { PolicialModel } from './policial-model';
import { CondutorModel } from './condutor-model';
export interface AcidenteModel {
  id: string;
  condutor: CondutorModel;
  policial: PolicialModel;
  rodovia: RodoviaModel;
  veiculo: VeiculoModel;
  dataDoAcidente: string;
  relatorio: string;
  casualidades: number;
}
