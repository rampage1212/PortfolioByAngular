import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { HomeComponent } from './home/home.component';
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: AboutComponent,
    path: 'about',
  },
  {
    component: TreeComponent,
    path: 'skills',
  },
  {
    component: ExperiencesComponent,
    path: 'experience',
  },
  {
    component: ContactComponent,
    path: 'contact',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
