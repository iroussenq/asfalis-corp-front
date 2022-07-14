export interface CondutorModel {
  id: string;
  nome: string;
  dataDeNascimento: string;
  statusCondutor: string;
  cpf: string;
  idade?: string;
  documentoValido?: boolean;
}
