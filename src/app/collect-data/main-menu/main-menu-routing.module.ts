import { MainMenuComponent } from './main-menu.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


/*const routes: Routes = [
  {
    path: 'plan',
    loadChildren: () => import('./tab-plan/tab-plan.module').then(m => m.TabPlanModule)
  },
  {
    path: 'monitoreo',
    loadChildren: () => import('./tab-plan/tab-plan.module').then(m => m.TabPlanModule)
  },
  {
    path: 'actividad',
    loadChildren: () => import('./tab-plan/tab-plan.module').then(m => m.TabPlanModule)
  },
  {
    path: 'mas',
    loadChildren: () => import('./tab-plan/tab-plan.module').then(m => m.TabPlanModule)
  },

];*/
const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    children: [
      {
        path: 'plan',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab-plan/tab-plan.module').then(m => m.TabPlanModule)
          }
        ]
      },
      {
        path: 'monitoreo',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab-monitoreo/tab-monitoreo.module').then(m => m.TabMonitoreoModule)
          }
        ]
      },
      {
        path: 'actividad',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab-actividad/tab-actividad.module').then(m => m.TabActividadModule)
          }
        ]
      },
      {
        path: 'mas',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab-mas/tab-mas.module').then(m => m.TabMasModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/main/plan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/plan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuRoutingModule {}
