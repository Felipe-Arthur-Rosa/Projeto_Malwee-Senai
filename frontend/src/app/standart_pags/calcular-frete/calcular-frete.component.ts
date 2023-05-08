import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCalcularFreteComponent } from 'src/app/edits_pags/edit-calcular-frete/edit-calcular-frete.component';
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
  products: Array<any> = [];
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list();
  }

  public async list(){
    this.frete = await this.httpService.get('delivery');
    if (this.filterTerm.length > 0){
      this.frete = await this.httpService.get('deliverysearch/' + this.filterTerm);
      
    }
  }

  public openModal(){
    const dialog = this.dialog.open(CalcularFreteModalComponent, {
      width: 'auto', height : 'auto'
    });

    dialog.afterClosed().subscribe((result : any) => {
      
    })
  }

  public openCalcularFreteModalEdit(product : any){
    const dialog = this.dialog.open(EditCalcularFreteComponent, {
      width : 'auto', height : 'auto',
      data  : {id : product.id}
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public async deleteFrete(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('delivery', {id});
      console.log(Response);
      this.list();
    })
    } 
}
