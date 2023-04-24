import { CalcularFreteComponent } from "./standart_pags/calcular-frete/calcular-frete.component";
import { ClientComponent } from "./standart_pags/client/client.component";
import { CollectionComponent } from "./standart_pags/collection/collection.component";
import { GroupComponent } from "./standart_pags/group/group.component";
import { ProductComponent } from "./standart_pags/product/product.component";
import { SubGroupComponent } from "./standart_pags/sub-group/sub-group.component";
import { UserComponent } from "./standart_pags/user/user.component";

export const MenuItens = [
    {
        path: 'group',
        caption : 'Grupos',
        icon : 'person',
        rule : [1],
        component: GroupComponent,
    },
    {
        path: 'sub-group',
        caption : 'Sub Grupos',
        icon : 'supervisor_account',
        rule : [1],
        component: SubGroupComponent,
        
    },
    {
        path: 'product',
        caption : 'Produtos',
        icon : 'shopping_basket',
        rule : [1],
        component: ProductComponent,
    },
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'assignment_ind',
        component: UserComponent,
        rule : [1],
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'assessment',
        rule : [1],
        component: CollectionComponent,
    },
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'face',
        rule : [1],
        component: ClientComponent,
    },
    {
        path: 'calcular frete',
        caption : 'Calcular Frete',
        icon : 'my_location',
        rule : [1]||[2]||[3],
        component: CalcularFreteComponent,
    }
]