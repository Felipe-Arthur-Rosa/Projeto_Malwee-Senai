import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { HomeComponent } from "./components/home/home.component";

import { MenuItens } from "./menu-itens";
import { LoginComponent } from "./standart_pags/login/login.component";


const rootRoutes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthService],
      children: [
        {
          path: '',
          canActivateChild: [AuthService],
          children: MenuItens
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];
  
  export const RoutesModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(rootRoutes, { relativeLinkResolution: 'legacy' });
  