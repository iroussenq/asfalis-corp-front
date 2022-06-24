import { Pessoa } from './pessoa';

export interface Policial extends Pessoa {
  patente: string;
}
