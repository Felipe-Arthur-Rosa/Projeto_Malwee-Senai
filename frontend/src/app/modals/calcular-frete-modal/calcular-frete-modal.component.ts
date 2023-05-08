import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogDataRequests {
  products: Array<any>;
  requests : Array<any>;
}

@Component({
  selector: 'app-calcular-frete-modal',
  templateUrl: './calcular-frete-modal.component.html',
  styleUrls: ['./calcular-frete-modal.component.scss']
})
export class CalcularFreteModalComponent implements OnInit {
  public product : Array<any> = [];
  public products : Array<any> = [];
  public frete: Array<any> = [];
  requests: Array<any>=[];
  fkClients: number = 0;
  valorUnitario: number = 0;
  fkProduct : number = 0;
  selectedProduct  = 0;
  description : string = '';
  totalProduct2: number = 0;
  price: number = 0;
  teste: number = 1;
  quantity : number = 0;
  discount: number = 0;
  desconto: number = 0;

  constructor(private httpService : HttpService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.product = await this.httpService.get('product');
    this.frete = await this.httpService.get('delivery');
  }

     async calculaTotal(){
        let descontoFinal = this.desconto/100 * this.valorUnitario;
        let valorUnitarioL = this.valorUnitario - descontoFinal;
        this.totalProduct2 = valorUnitarioL * this.quantity;
      }
  
    async addFrete(){
      
      this.frete = await this.httpService.post('delivery', {fkProduct : this.selectedProduct, price : this.totalProduct2, porcent : this.desconto})
    }

  // public async list(){
  //   this.product = await this.httpService.get('product');
  //   if (this.description.length > 0){
  //     this.product = await this.httpService.get('product' + this.description);
  //     console.log(this.product)
  //   }
  }

