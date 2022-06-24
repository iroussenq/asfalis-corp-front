import { Pessoa } from './pessoa';

export interface Condutor extends Pessoa {
  statusCondutor: string;
}
