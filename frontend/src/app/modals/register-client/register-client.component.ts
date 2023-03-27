import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {

  constructor(private httpService : HttpService) { }
  name : string = '';
  username : string = '';
  password : string = '';
  cpassword : string = '';
  
  ngOnInit(): void {
  }

  public async add(){
    await this.httpService.post('user_client', {name : this.name, username : this.username, password : this.password, cpassword : this.cpassword});
  }
}
