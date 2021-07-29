import { Comportamiento } from "./comportamientos.model";

export class Competencia {
  constructor(
    public id: number,
    public nombre: string,
    public descripcionCompetencia: string,
    public comportamientos: Comportamiento[]
  ) {}
}