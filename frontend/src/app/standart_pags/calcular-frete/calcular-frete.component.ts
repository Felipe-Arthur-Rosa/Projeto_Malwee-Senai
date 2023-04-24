import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalcularFreteModalComponent } from 'src/app/modals/calcular-frete-modal/calcular-frete-modal.component';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-calcular-frete',
  templateUrl: './calcular-frete.component.html',
  styleUrls: ['./calcular-frete.component.scss']
})
export class CalcularFreteComponent implements OnInit { 
  frete : Array<any> = [];
  product : Array<any> = [];
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){
    this.frete = await this.httpService.get('delivery');
    if (this.filterTerm.length > 0){
      this.frete = await this.httpService.get('delivery' + this.filterTerm);
      
    }
  }

  public async list2(){
    this.product = await this.httpService.get('product');
    if (this.filterTerm.length > 0){
      this.product = await this.httpService.get('product' + this.filterTerm);
      
    }
  }

  public openModal(){
    const dialog = this.dialog.open(CalcularFreteModalComponent, {
      width: 'auto', height : 'auto'
    });

    dialog.afterClosed().subscribe((result : any) => {
      
    })
  }
}
