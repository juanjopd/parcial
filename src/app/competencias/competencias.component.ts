import { Component, OnInit } from '@angular/core';
import { Competencia } from './compentencias.model';
import { Comportamiento } from './comportamientos.model';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommaExpr } from '@angular/compiler';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css']
})
export class CompetenciasComponent implements OnInit {

  competencias : Competencia[] = [];
  comportamientos: Comportamiento[] = [];
  descripcionComportamiento = "";
  porcentajePeso = 0;
  siExisten: boolean = true;
  nombre = "";
  descripcionCompetencia = "";
  closeModal: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  triggerModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  agregarCompetencia() {
    try {
      let competencia = new Competencia(
        this.competencias.length + 1,
        this.nombre,
        this.descripcionCompetencia,
        []
      );
      this.competencias.push(competencia);
      this.siExisten = false;
    } catch (e) {
      console.log("An error ocurred on Agregar Item =>", e);
    }
  }

  agregarComportamiento(id: number) {
    try {
      if (this.nombre != "" && this.porcentajePeso != 1) {
        let comportamiento = new Comportamiento(this.nombre, this.porcentajePeso, id);
        this.competencias[id].comportamientos.push(comportamiento);
        this.siExisten = false;
      }
      return;
    } catch (e) {
      console.log("An error ocurred on Agregar Item =>", e);
    }
  }

  borrarCompetencia(){
    var arr = this.competencias;
    var removed = arr.splice(0,this.competencias.length); 
  }
  headElements = ["ID", "Competencia", "Descripcion", "", "Comportamientos", "Eliminar campos"];
  headElements2 = ["Comportamiento", "Porcentaje"];

}
