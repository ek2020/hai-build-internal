import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInfoComponent } from './pages/app-info/app-info.component';
import { AppsComponent } from './pages/apps/apps.component';
import { CreateSolutionComponent } from './pages/create-solution/create-solution.component';
import { EditSolutionComponent } from './pages/edit-solution/edit-solution.component';
import { UserStoriesComponent } from './pages/user-stories/user-stories.component';
import { AddTaskComponent } from './pages/tasks/add-task/add-task.component';
import { EditUserStoriesComponent } from './pages/edit-user-stories/edit-user-stories.component';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { BusinessProcessComponent } from './pages/business-process/business-process.component';
import { AuthGuard } from './guards/auth.guard';
import { BusinessProcessFlowComponent } from './pages/business-process-flow/business-process-flow.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'apps/create',
    component: CreateSolutionComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    data: {
      breadcrumb: {
        name: 'Create Solution',
        link: '/apps',
        icon: 'add',
      },
    },
  },
  {
    path: 'apps/:id',
    component: AppInfoComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        link: '/apps',
        icon: 'add',
      },
    },
  },
  { path: 'apps', component: AppsComponent, canActivate: [AuthGuard] },
  {
    path: 'user-stories/:prdId',
    component: UserStoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'task-list/:userStoryId',
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'task/:mode/:userStoryId',
    component: AddTaskComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'task/:mode/:userStoryId/:taskId',
    component: AddTaskComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'story/:mode',
    component: EditUserStoriesComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'story/:mode/:userStoryId',
    component: EditUserStoriesComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'edit',
    component: EditSolutionComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'add',
    component: EditSolutionComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'bp-add',
    component: BusinessProcessComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'bp-edit',
    component: BusinessProcessComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'bp-flow/:mode/:id',
    component: BusinessProcessFlowComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      paramsInheritanceStrategy: 'always',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
