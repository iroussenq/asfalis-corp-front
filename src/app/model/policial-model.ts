export interface PolicialModel {
  id: string;
  nome: string;
  dataDeNascimento: string;
  patente: string;
  cpf: string;
  idade?: string;
  documentoValido?: boolean;
}
