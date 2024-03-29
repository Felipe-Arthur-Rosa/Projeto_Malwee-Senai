import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RegisterClientComponent } from 'src/app/modals/register-client/register-client.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string = '';
  password : string = '';
  hide : boolean = true;
  isLogin : boolean = false;

  constructor(private router : Router, private HttpClient : HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.login();
    })
  }

  public login(){
    this.HttpClient.post('http://localhost:3006/logon', {username : this.username, password : this.password}).toPromise().then((response : any)=> {
      console.log(response.user);
      
      if(response.token){
        this.isLogin = true;
        window.localStorage.setItem('token', response.token);
        window.localStorage.setItem('rule', response.user.rules);
        this.router.navigateByUrl('');
        console.log("Logado");
      }
    })
  }
  
  public openModal(){
    const dialog = this.dialog.open(RegisterClientComponent, {
      width: '450px',
    });
}
}
