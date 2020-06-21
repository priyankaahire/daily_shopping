import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home-routing.module').then(m => m.HomePageRoutingModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../mycart/mycart-routing.module').then(m => m.MycartPageRoutingModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../order-history/order-history-routing.module').then(m => m.OrderHistoryPageRoutingModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile-routing.module').then(m => m.ProfilePageRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
