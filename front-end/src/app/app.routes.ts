import { Routes } from '@angular/router';
import { TasksList } from './tasks/tasks-list/tasks-list';
import { TaskWindow } from './tasks/task-window/task-window';
import { Login } from './authentication/login/login';
import { loggedInGuard, routeGuard } from './tasks/shared/route-guard';
import { Register } from './authentication/register/register';

export const routes: Routes = [
 

    {
        path: "tasks",
        component: TasksList,
        canActivate: [routeGuard]
        // children: [
        //     {
        //        path: "task/:id" ,
        //        component: TaskWindow
        //     }
        // ]
    },
    {
       path: "login",
       component: Login,
       canActivate: [loggedInGuard]
    //    redirectTo: "login",
    //    pathMatch: 'full'
    },

    {
        path: "register",
        component: Register,
        canActivate: [loggedInGuard]
    },

    {
        path: "",
        component: Login,
        canActivate: [loggedInGuard]
    },
    {
        path:"**",
        redirectTo: "tasks"
    }
];
