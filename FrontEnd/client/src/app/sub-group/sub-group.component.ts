import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { QuestionService } from 'src/services/question.service';
import { SubGroupModalComponent } from '../sub-group-modal/sub-group-modal.component';
import { EditSubGroupComponent } from '../edit-sub-group/edit-sub-group.component';
// import { FormUtils } from '../Utils/formutils';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss']
})
export class SubGroupComponent implements OnInit {
  subgroups : Array<any> =[]; 
  filterTerm : string = '';
  groups : Array<any> =[]; 
  

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list();
    // FormUtils.setFocus('inputFilter');    
  }

  public async list(){
    this.subgroups = await this.httpService.get('subgroup');
  }

  public openModal(){
    const dialog = this.dialog.open(SubGroupModalComponent, {
      width: 'auto', height: 'auto'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(subgroup : any){
    const dialog = this.dialog.open(EditSubGroupComponent, {
      width: '450px',
      data : subgroup
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

   
  public async deleteSubGroup(id : number){
  this.question.ask(async () => {
    await this.httpService.patch('subgroup', {id});
    this.list();
  })
  }    

}
