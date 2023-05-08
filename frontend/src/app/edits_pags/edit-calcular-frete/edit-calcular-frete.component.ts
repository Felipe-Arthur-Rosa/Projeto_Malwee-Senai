import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogDataRequests {
  products: Array<any>;
  requests : Array<any>;
  frete: Array<any>;
}

@Component({
  selector: 'app-edit-calcular-frete',
  templateUrl: './edit-calcular-frete.component.html',
  styleUrls: ['./edit-calcular-frete.component.scss']
})

export class EditCalcularFreteComponent implements OnInit {
  public product : Array<any> = [];
  public frete: Array<any> = [];
  public products : Array<any> = [];
  desconto: number = 0;
  selectedProduct  = 0;
  totalProduct2: number = 0;
  valorUnitario: number = 0;
  quantity : number = 0;
  price: number = 0;
  constructor(private httpService : HttpService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    this.product = await this.httpService.get('product');
    this.frete = await this.httpService.get('delivery');
    this.frete = await this.httpService.get('product');
  }

  async calculaTotal(){
    let descontoFinal = this.desconto/100 * this.valorUnitario;
    let valorUnitarioL = this.valorUnitario - descontoFinal;
    this.totalProduct2 = valorUnitarioL * this.quantity;
  }

  async change(){
    this.frete = await this.httpService.put('delivery',{price: this.totalProduct2, fkProduct: this.selectedProduct, porcent: this.desconto, id : this.data.id });
  }
}
