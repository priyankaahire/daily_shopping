import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./pages/slider1/slider1.module').then( m => m.Slider1PageModule)
  },
  {
    path: 'slider2',
    loadChildren: () => import('./pages/slider2/slider2.module').then( m => m.Slider2PageModule)
  },
  {
    path: 'slider3',
    loadChildren: () => import('./pages/slider3/slider3.module').then( m => m.Slider3PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'deal-of-day',
    loadChildren: () => import('./pages/deal-of-day/deal-of-day.module').then( m => m.DealOfDayPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signupdetails',
    loadChildren: () => import('./pages/signupdetails/signupdetails.module').then( m => m.SignupdetailsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'mycart',
    loadChildren: () => import('./pages/mycart/mycart.module').then( m => m.MycartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./pages/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
