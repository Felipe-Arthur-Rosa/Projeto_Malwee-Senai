import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/standart_pags/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RoutesModule } from './routes.module';
import { GroupComponent } from 'src/app/standart_pags/group/group.component';
import { UserComponent } from 'src/app/standart_pags/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { GroupModalComponent } from 'src/app/modals/group-modal/group-modal.component';
import { BasicmodalComponent } from './components/basicmodal/basicmodal.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionService } from 'src/services/question.service';
import { SubGroupComponent } from 'src/app/standart_pags/sub-group/sub-group.component';
import { SubGroupModalComponent } from './modals/sub-group-modal/sub-group-modal.component';
import { ProductComponent } from 'src/app/standart_pags/product/product.component';
import { ProductModalComponent } from 'src/app/modals/product-modal/product-modal.component';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { DropdownComponent } from 'src/app/components/dropdown/dropdown.component';
import { CollectionComponent } from './standart_pags/collection/collection.component';
import { CollectionModalComponent } from 'src/app/modals/collection-modal/collection-modal.component';
import { ClientComponent } from './standart_pags/client/client.component';
import { ClientModalComponent } from 'src/app/modals/client-modal/client-modal.component';
import { EditGroupComponent } from 'src/app/edits_pags/edit-group/edit-group.component';
import { EditSubGroupComponent } from './edits_pags/edit-sub-group/edit-sub-group.component';
import { EditProductComponent } from 'src/app/edits_pags/edit-product/edit-product.component';
import { EditClientComponent } from 'src/app/edits_pags/edit-client/edit-client.component';
import { EditUserComponent } from 'src/app/edits_pags/edit-user/edit-user.component';
import { EditCollectionComponent } from 'src/app/edits_pags/edit-collection/edit-collection.component';
import { ClientAdressComponent } from './modals/client-adress/client-adress.component';
import { EditAdressComponent } from 'src/app/edits_pags/edit-adress/edit-adress.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    GroupComponent,
    UserComponent,
    GroupModalComponent,
    BasicmodalComponent,
    InputComponent,
    QuestionComponent,
    SubGroupComponent,
    SubGroupModalComponent,
    ProductComponent,
    ProductModalComponent,
    UserModalComponent,
    DropdownComponent,
    CollectionComponent,
    CollectionModalComponent,
    ClientComponent,
    ClientModalComponent,
    EditGroupComponent,
    EditSubGroupComponent,
    EditProductComponent,
    EditClientComponent,
    EditUserComponent,
    EditCollectionComponent,
    ClientAdressComponent,
    EditAdressComponent,
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports : [
    RouterModule
  ],
  providers: [
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
