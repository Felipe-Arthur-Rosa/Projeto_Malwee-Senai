import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditAdressComponent } from 'src/app/edits_pags/edit-adress/edit-adress.component';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {
  customer : any;
  filterTerm : string = ''; 

  constructor(public httpClient: HttpClient, public dialogRef: MatDialogRef<ClientModalComponent>,private httpService : HttpService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data : any, private question: QuestionService) { }

  async ngOnInit() {
    this.reset();
    await this.loadCustomer();
  }

  private async loadCustomer(){
    if (!this.data || this.data.id <= 0){
      return;
    }

    const customer = await this.httpService.get('client/' + this.data.id);

    if (!customer){
      return;
    }

    this.customer = customer;
  }

  public openModal(data : any = undefined){
    const dialog = this.dialog.open(EditAdressComponent, {
      width: '450px',
      data : data
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.customer.addresses.push(result);
    })
  }

  public async save(){
    const obj : any = {
      nameFantasy  : this.customer.nameFantasy,
      CNPJ         : this.customer.CNPJ,
      socialReason : this.customer.socialReason,
      clientSince  : new Date(),
      address      : []
    }

    for(const address of this.customer.addresses){
      obj.address.push({
        district   : address.district,
        city       : address.city,
        state      : address.state,
        cep        : address.cep,
        number     : address.number,
        street     : address.street,
        complement : address.complement
      });
    }
    
    if (!this.data){      
      await this.httpService.post('client', obj);
    }

    if (this.data && this.data.id > 0){      
      obj.id = this.customer.id;
      await this.httpService.put('client', obj);
    }
   
    this.closeModal()
  }

  closeModal(): void {
      this.dialogRef.close();
  }

      public async reset(){
        this.customer = {
          nameFantasy  : '',
          CNPJ         : '',
          socialReason : '',
          clientSince  : '',
          addresses    : []
        }
      }

  }
