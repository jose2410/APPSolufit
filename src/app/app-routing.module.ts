import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'info',
    loadChildren: () => import('./info/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path: 'collect',
    loadChildren: () => import('./collect-data/collect-data.module').then( m => m.CollectDataPageModule)
  },
   {
    path: 'main',
    loadChildren: () => import('./collect-data/main-menu/main-menu.module').then( m => m.MainMenuModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
