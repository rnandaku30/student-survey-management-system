import { Routes } from '@angular/router';
import { CsDepartmentComponent } from './components/cs-department/cs-department.component';
import { HomeComponent } from './components/home/home.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { SurveyComponent } from './components/survey/survey.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'survey', component: SurveyComponent },
    { path: 'survey/:id', component: SurveyComponent },  // For Edit
    { path: 'survey/:id/view', component: SurveyComponent },  // For View (Read-Only)
    { path: 'cs-department', component: CsDepartmentComponent },
    { path: 'survey-list', component: SurveyListComponent }
];

