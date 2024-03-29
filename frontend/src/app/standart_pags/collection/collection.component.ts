import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCollectionComponent } from 'src/app/edits_pags/edit-collection/edit-collection.component';
import { CollectionModalComponent } from 'src/app/modals/collection-modal/collection-modal.component';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collections : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }
  ngOnInit(): void {
    this.list()
  }
  public async list(){
    this.collections = await this.httpService.get('collection');
    if (this.filterTerm.length > 0){
      this.collections = await this.httpService.get('collectionsearch/' + this.filterTerm);
      console.log(this.collections)
    }
  }

  public openModal(){
    const dialog = this.dialog.open(CollectionModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(collection : any){
    const dialog = this.dialog.open(EditCollectionComponent, {
      width: '450px',
      data : collection
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

    
  public async deleteCollection(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('collection', {id});
      console.log(Response);
      this.list();
    })
    }    
  
}
