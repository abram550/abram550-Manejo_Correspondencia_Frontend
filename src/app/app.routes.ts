import { Routes } from '@angular/router';

// Importing components generated for different tables
import { ShowUsersComponent } from './components/users1/show-users/show-users.component';
import { CreateUsersComponent } from './components/users1/create-users/create-users.component';
import { UpdateUsersComponent } from './components/users1/update-users/update-users.component';

import { ShowEmployeesComponent } from './components/employees/show-employees/show-employees.component';
import { CreateEmployeesComponent } from './components/employees/create-employee/create-employees.component';
import { UpdateEmployeesComponent } from './components/employees/update-employees/update-employees.component';

import { ShowCorrespondenceTypeComponent } from './components/correspondencetype/show-correspondence-type/show-correspondence-type.component';
import { CreateCorrespondenceTypeComponent } from './components/correspondencetype/create-correspondence-type/create-correspondence-type.component';
import { UpdateCorrespondenceTypeComponent } from './components/correspondencetype/update-correspondence-type/update-correspondence-type.component';

import { ShowCorrespondenceStatusComponent } from './components/correspondencestatus/show-correspondence-status/show-correspondence-status.component';
import { CreateCorrespondenceStatusComponent } from './components/correspondencestatus/create-correspondence-status/create-correspondence-status.component';
import { UpdateCorrespondenceStateComponent } from './components/correspondencestatus/update-correspondence-status/update-correspondence-status.component';

import { ShowBranchesComponent } from './components/branches/show-branches/show-branches.component';
import { CreateBranchesComponent } from './components/branches/create-branches/create-branches.component';
import { UpdateBranchesComponent } from './components/branches/update-branches/update-branches.component';

import { ShowTransportComponent } from './components/transport/show-transport/show-transport.component';
import { CreateTransportComponent } from './components/transport/create-transport/create-transport.component';
import { UpdateTransportComponent } from './components/transport/update-transport/update-transport.component';


import { ShowRoutesComponent } from './components/route/show-routes/show-routes.component';
import { CreateRoutesComponent } from './components/route/create-routes/create-routes.component';
import { UpdateRoutesComponent } from './components/route/update-routes/update-routes.component';

import { DisplayCorrespondenceComponent } from './components/correspondence/display-correspondence/display-correspondence.component';
import { CreateCorrespondenceComponent } from './components/correspondence/create-correspondence/create-correspondence.component';
import { UpdateCorrespondenceComponent } from './components/correspondence/update-correspondence/update-correspondence.component';

import { ShowPaymentsComponent } from './components/payment__/show-payment_/show-payment.component';
import { CreatePaymentsComponent } from './components/payment__/create-payment/create-payment.component';
import { UpdatePaymentComponent } from './components/payment__/update-payment/update-payment.component';

import { ShowCorrespondenceEventComponent } from './components/correspondenceevents/show-correspondence-event/show-correspondence-event.componen';
import { CreateCorrespondenceEventComponent } from './components/correspondenceevents/create-correspondence-event/create-correspondence-event.component';
import { UpdateCorrespondenceEventsComponent } from './components/correspondenceevents/update-correspondence-events/update-correspondence-events.component';

// Routes for User Type
import { DisplayUserTypeComponent } from './components/usertype/display-user-type/display-user-type.component';
import { CreateUserTypeComponent } from './components/usertype/crear-tipo-usuario/create-user-type.component';
import { UpdateUserTypeComponent } from './components/usertype/update-user-type/update-user-type.component';


// Routes for Payment Type
import { ShowPaymentTypeComponent } from './components/paymenttype/show-payment-type/show-payment-type.component';
import { CreatePaymentTypeComponent } from './components/paymenttype/create-payment-type/create-payment-type.component';
import { UpdatePaymentTypeComponent } from './components/paymenttype/update-payment-type/update-payment-type.component';

// Routes for Employee Type
import { ShowEmployeeTypeComponent } from './components/employeetype_/show-employee-type/show-employee-type.component';
import { CreateEmployeeTypeComponent } from './components/employeetype_/create-employee-type/create-employee-type.component';
import { UpdateEmployeeTypeComponent } from './components/employeetype_/update-employee-type/update-employee-type.component';


// Routes for Vehicle Type
import { DisplayVehicleTypeComponent } from './components/vehicletype/display-vehicle-type/display-vehicle-type.component';
import { CreateVehicleTypeComponent } from './components/vehicletype/create-vehicle-type/create-vehicle-type.component';
import { UpdateVehicleTypeComponent } from './components/vehicletype/update-vehicle-type/update-vehicle-type.component';


// Defining the routes for the application
export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/users',  // Redirecting to users page by default
        pathMatch: 'full' 
    },
    // Routes for Users
    {
        path: "users",
        component: ShowUsersComponent  // Shows the list of users
    },
    {
        path: "users/new",
        component: CreateUsersComponent  // Form to create a new user
    },
    {
        path: "users/edit/:id",
        component: UpdateUsersComponent  // Form to update an existing user by id
    },
    // Routes for Employees
    {
        path: "employees",
        component: ShowEmployeesComponent  // Shows the list of employees
    },
    {
        path: "employees/new",
        component: CreateEmployeesComponent  // Form to create a new employee
    },
    {
        path: "employees/edit/:id",
        component: UpdateEmployeesComponent  // Form to update an existing employee by id
    },
    // Routes for Correspondence Type
    {
        path: "correspondence-type",
        component: ShowCorrespondenceTypeComponent  // Shows the list of correspondence types
    },
    {
        path: "correspondence-type/new",
        component: CreateCorrespondenceTypeComponent  // Form to create a new correspondence type
    },
    {
        path: "correspondence-type/edit/:id",
        component: UpdateCorrespondenceTypeComponent  // Form to update a correspondence type by id
    },
    // Routes for Correspondence Status
    {
        path: "correspondence-status",
        component: ShowCorrespondenceStatusComponent  // Shows the list of correspondence statuses
    },
    {
        path: "correspondence-status/new",
        component: CreateCorrespondenceStatusComponent  // Form to create a new correspondence status
    },
    {
        path: "correspondence-status/edit/:id",
        component: UpdateCorrespondenceStateComponent  // Form to update a correspondence status by id
    },
    // Routes for Branches
    {
        path: "branches",
        component: ShowBranchesComponent  // Shows the list of branches
    },
    {
        path: "branches/new",
        component: CreateBranchesComponent  // Form to create a new branch
    },
    {
        path: "branches/edit/:id",
        component: UpdateBranchesComponent  // Form to update a branch by id
    },
    // Routes for Transport
    {
        path: "transport",
        component: ShowTransportComponent  // Shows the list of transport
    },
    {
        path: "transport/new",
        component: CreateTransportComponent  // Form to create a new transport
    },
    {
        path: "transport/edit/:id",
        component: UpdateTransportComponent  // Form to update a transport by id
    },
    // Routes for Routes
    {
        path: "routes",
        component: ShowRoutesComponent  // Shows the list of routes
    },
    {
        path: "routes/new",
        component: CreateRoutesComponent  // Form to create a new route
    },
    {
        path: "routes/edit/:id",
        component: UpdateRoutesComponent  // Form to update a route by id
    },
    // Routes for Correspondence
    {
        path: "correspondence",
        component: DisplayCorrespondenceComponent  // Shows the list of correspondence
    },
    {
        path: "correspondence/new",
        component: CreateCorrespondenceComponent  // Form to create a new correspondence
    },
    {
        path: "correspondence/edit/:id",
        component: UpdateCorrespondenceComponent  // Form to update correspondence by id
    },
    // Routes for Payments
    {
        path: "payments",
        component: ShowPaymentsComponent  // Shows the list of payments
    },
    {
        path: "payments/new",
        component: CreatePaymentsComponent  // Form to create a new payment
    },
    {
        path: "payments/edit/:id",
        component: UpdatePaymentComponent  // Form to update a payment by id
    },
    // Routes for Correspondence Events
    {
        path: "correspondence-events",
        component: ShowCorrespondenceEventComponent  // Shows the list of correspondence events
    },
    {
        path: "correspondence-events/new",
        component: CreateCorrespondenceEventComponent  // Form to create a new correspondence event
    },
    {
        path: "correspondence-events/edit/:id",
        component: UpdateCorrespondenceEventsComponent  // Form to update a correspondence event by id
    },
    // Routes for User Type
    {
        path: "user-type",
        component: DisplayUserTypeComponent  // Shows the list of user types
    },
    {
        path: "user-type/new",
        component: CreateUserTypeComponent  // Form to create a new user type
    },
    {
        path: "user-type/edit/:id",
        component: UpdateUserTypeComponent  // Form to update user type by id
    },
    // Routes for Payment Type
    {
        path: "payment-type",
        component: ShowPaymentTypeComponent  // Shows the list of payment types
    },
    {
        path: "payment-type/new",
        component: CreatePaymentTypeComponent  // Form to create a new payment type
    },
    {
        path: "payment-type/edit/:id",
        component: UpdatePaymentTypeComponent  // Form to update a payment type by id
    },
    // Routes for Employee Type
    {
        path: "employee-type",
        component: ShowEmployeeTypeComponent  // Shows the list of employee types
    },
    {
        path: "employee-type/new",
        component: CreateEmployeeTypeComponent  // Form to create a new employee type
    },
    {
        path: "employee-type/edit/:id",
        component: UpdateEmployeeTypeComponent  // Form to update employee type by id
    },
    // Routes for Vehicle Type
    {
        path: "vehicle-type",
        component: DisplayVehicleTypeComponent  // Shows the list of vehicle types
    },
    {
        path: "vehicle-type/new",
        component: CreateVehicleTypeComponent  // Form to create a new vehicle type
    },
    {
        path: "vehicle-type/edit/:id",
        component: UpdateVehicleTypeComponent  // Form to update vehicle type by id
    },
];
