import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './Shared/modules/not-found/notfound.component';
import { ResellerMapComponent } from './Components/our-values/our-value/reseller-map.component';
import { AllCountryResellerComponent } from './Components/our-values/all-country-reseller/all-country-reseller.component';

const routes: Routes = [

{path:'', component:HomeComponent},
{path:'home', component:HomeComponent},
{path:'product',  loadChildren: () => import('./Components/product/product.module').then(m => m.ProductModule)},
{path:'promo', loadChildren: () => import('./Components/promo/promo.module').then(m => m.PromoModule)},
{path:'destributors', loadChildren: () => import('./Components/destributors/destributors.module').then(m => m.DestributorsModule)},
{path:'contact', loadChildren: () => import('./Components/contact/contact.module').then(m => m.ContactModule)},
{path:'about', loadChildren: () => import('./Components/about/about.module').then(m => m.AboutModule)},
{path:'faq', loadChildren: () => import('./Components/foire-question/foirquestion.module').then(m => m.FoirquestionModule)},
{path:'signin', loadChildren: () => import('./Components/signin/signin.module').then(m => m.SigninModule)},
{path:'signin-user', loadChildren: () => import('./Components/signin2/signin2.module').then(m => m.Signin2Module)},
{path:'signup',  loadChildren: () => import('./Components/signup/signup.module').then(m => m.SignupModule)},
{path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
{path:'my-cart', loadChildren: () => import('./Components/cart/cart.module').then(m => m.CartModule)},
{path:'our-value', component:AllCountryResellerComponent},
{path:'our-value/adress', component:ResellerMapComponent},
{path:'**', component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
