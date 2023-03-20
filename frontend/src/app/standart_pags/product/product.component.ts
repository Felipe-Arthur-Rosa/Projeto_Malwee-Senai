import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from 'src/app/edits_pags/edit-product/edit-product.component';
import { ProductModalComponent } from 'src/app/modals/product-modal/product-modal.component';
import { HttpService } from 'src/services/http.service';

import { QuestionService } from 'src/services/question.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  groups : Array<any> =[]; 
  filterTerm : string = '';
  products : Array<any> =[]; 

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){
    this.products = await this.httpService.get('product');
  }

  public openModal(){
    const dialog = this.dialog.open(ProductModalComponent, {
      width: 'auto', height: 'auto'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(product : any){
    const dialog = this.dialog.open(EditProductComponent, {
      width: '450px',
      data : product
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

   
  public async deleteSubGroup(id : number){
  this.question.ask(async () => {
    await this.httpService.patch('product', {id});
    this.list();
  })
  }    

}
