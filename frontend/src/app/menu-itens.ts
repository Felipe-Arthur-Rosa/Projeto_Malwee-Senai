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
        component: GroupComponent,
    },
    {
        path: 'sub-group',
        caption : 'Sub Grupos',
        icon : 'supervisor_account',
        component: SubGroupComponent,
    },
    {
        path: 'product',
        caption : 'Produtos',
        icon : 'shopping_basket',
        component: ProductComponent,
    },
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'assignment_ind',
        component: UserComponent,
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'assessment',
        component: CollectionComponent,
    },
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'face',
        component: ClientComponent,
    }
]