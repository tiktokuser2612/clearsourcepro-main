<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1', 'namespace' => 'Api\V1'], function () {
    Route::get('/maintain', 'MaintainController@index');
    Route::get('/zipcode/search', 'ZipcodeController@getSearch');
    // Route::post('/log', 'UserController@logActivity');
    Route::post('/auth/login', 'UserController@login');
    Route::get('/user/recruiters-list', 'UserController@getRecruitersList');
    Route::get('/permission/permission-list', 'RecruiterController@getPermissionList');

    Route::group(['middleware' => 'auth:api'], function () {
    // Route::group(['prefix' => 'admin', 'middleware' => ['auth:api', 'auth.level:admin']], function () {
        Route::post('auth/logout', 'UserController@logout');
        Route::get('auth/me', 'UserController@getMe');
        Route::post('auth/me', 'UserController@putMe');
        
        
        Route::put('auth/password', 'UserController@changePassword');
        
        //Client Routes
        // Route::post('admin/client', 'ClientController@postIndex');
        Route::get('admin/client/company/list', 'ClientController@getListCompanies');
        
        // Route::post('admin/clients', 'ClientController@getIndex');
        Route::post('admin/clients', 'ClientController@getClients');
        Route::put('admin/client/{id}', 'ClientController@put');
        // Route::get('admin/client/{id}', 'ClientController@get');
        Route::get('admin/client/{id}', 'ClientController@getCompany');
        Route::delete('admin/client/{id}', 'ClientController@delete');

        //Recruiter Routes
        Route::post('admin/recruiter', 'RecruiterController@postIndex');
        Route::post('admin/recruiters/list', 'RecruiterController@getIndex');
        Route::get('admin/recruiter/{id}', 'RecruiterController@get');
        Route::post('admin/recruiter/{id}', 'RecruiterController@put');
        Route::delete('admin/recruiter/{id}', 'RecruiterController@delete');

        //Requisition routes 
        Route::post('admin/requisition', 'RequisitionController@postIndex');
        Route::post('admin/requisitions/list', 'RequisitionController@getIndex');
        Route::get('admin/requisitions/client/list', 'RequisitionController@getClientList');
        Route::get('admin/requisition/{id}', 'RequisitionController@get');
        Route::post('admin/requisition/{id}', 'RequisitionController@put');
        Route::delete('admin/requisition/{id}', 'RequisitionController@delete');

        //Candidate Routes
        Route::post('admin/candidate', 'CandidateController@postIndex');
        Route::post('admin/candidates/list', 'CandidateController@getIndex');
        Route::get('admin/candidate/{id}', 'CandidateController@get');
        Route::post('admin/candidate/{id}', 'CandidateController@put');
        Route::delete('admin/candidate/{id}', 'CandidateController@delete');

        //User Routes
        Route::post('admin/user', 'UserController@postIndex');
        Route::post('admin/users/list', 'UserController@getIndex');
        Route::get('admin/user/{id}', 'UserController@get');
        Route::put('admin/user/{id}', 'UserController@put');
        Route::post('admin/user/status/{id}', 'UserController@changeUserStatus');
        Route::post('admin/user/search', 'UserController@searchUser');

        //Notes Routes
        Route::post('admin/note', 'NoteController@postIndex');
        Route::post('admin/notes/list', 'NoteController@getIndex');
        Route::get('admin/note/{id}', 'NoteController@get');
        Route::put('admin/note/{id}', 'NoteController@put');

        // Client Record Routes
        Route::post('admin/client_record', 'ClientRecordController@postIndex');
        Route::post('admin/client_records/list', 'ClientRecordController@getIndex');
        Route::get('admin/client_record/{id}', 'ClientRecordController@get');
        Route::post('admin/client_record/{id}', 'ClientRecordController@put');
        Route::delete('admin/client_record/{id}', 'ClientRecordController@delete');

        //Job Routes
        Route::post('admin/job/search', 'SearchJobController@getIndex');
        Route::get('job/details/{id}', 'SearchJobController@getJobDetails');
        Route::post('job/submit', 'SearchJobController@postJob');


        //Admin send Mail
        Route::post('admin/sendmail', 'UserController@sendMail');
        
        //Client Hiring Manager 
        Route::post('admin/client/hiringManger', 'ClientController@postHiringManager');
        Route::post('admin/client/hiringManagers', 'ClientController@getHiringManagers');
        Route::get('admin/client/hiringManager/{id}', 'ClientController@getHiringManager');
        Route::put('admin/client/hiringManager/{id}', 'ClientController@putHiringManager');
        Route::delete('admin/client/hiringManager/{id}', 'ClientController@deleteHiringManager');
        
        //Client
        Route::post('admin/client/', 'ClientController@postClient');

        Route::get('admin/clients/', 'UserController@getClientRoleUsers');

        Route::get('admin/client/recruiters/list', 'ClientController@getClientRecruiters');

        
        Route::get('admin/executive/list', 'ClientController@getExecuitve');
        
        //Company 
        Route::post('admin/company/managers', 'RequisitionController@getCompanyMangers');
    });

    Route::group(['prefix' => 'client' , 'middleware' => 'auth:api'], function () {
            
        //Client Account Details Routes 
        Route::get('/account/view/{id}', 'ClientController@get');
        Route::post('/account/edit/{id}', 'ClientController@clientRoleput');
        
        //Client Requsitions Routes
        Route::post('/requisitions/list/', 'ClientController@clientRequisitions');
        Route::get('/requisition/view/{id}', 'RequisitionController@get');
        Route::post('/requisition/edit/{id}', 'RequisitionController@put');
        Route::post('/requisition/create', 'RequisitionController@postIndex');
        Route::delete('/requisition/{id}', 'RequisitionController@delete');
        Route::get('/recruiter/{id}', 'ClientController@getRecruiter');

        // Company Related Routes
        Route::post('/company/managers', 'CompanyController@getCompanyManagers');
        Route::get('/user/account/{id}', 'CompanyController@getCompanyClientAccountDetails');
        
        Route::post('/user/account', 'CompanyController@putCompanyClientAccountDetails');

        // Recruiters Routes
        Route::post('/recruiters', 'CompanyController@getCompanyRecruiterListing');
        Route::get('/recruiter/{id}', 'CompanyController@getCompanyRecruiter');
        Route::post('recruiter/create', 'CompanyController@postCompanyRecruiterDetails');
        Route::post('recruiter/edit/{id}', 'CompanyController@editCompanyRecruiterDetails');
        Route::delete('recruiter/{id}', 'CompanyController@deleteCompanyRecruiterDetails');

        //Company managers
        Route::get('/managers/{id}', 'CompanyController@getMangersForRequisitions');

        //Company requisition listing
        Route::post('/company/requisitions/list', 'CompanyController@getCompanyRequisitions');
    });

    Route::group(['prefix' => 'recruiter' , 'middleware' => 'auth:api'], function () {

        //Requisition routes   
        Route::post('/requisition', 'RecruiterController@postRequisition');
        Route::post('/requisitions/list', 'RecruiterController@getRequisitions');
        Route::get('/requisition/{id}', 'RequisitionController@get');
        Route::post('/requisition/{id}', 'RequisitionController@put');
        Route::get('/company/info', 'RecruiterController@getCompanyDetail');
        
        Route::get('/notification', 'RecruiterController@getNotificationDetails');
        
        Route::get('/disableNotification/{id}', 'RecruiterController@disableNotificationDetails');
        
    });
    Route::group(['prefix' => 'account_executive' , 'middleware' => 'auth:api'], function () {

        //Requisition routes   
        Route::post('/requisition', 'RecruiterController@postRequisition');
        Route::post('/requisitions/list', 'RecruiterController@getRequisitions');
        Route::get('/requisition/{id}', 'RequisitionController@get');
        Route::post('/requisition/{id}', 'RequisitionController@put');  //
        Route::get('/company/association/', 'ExecutiveController@getCompanyAssociationExecutiveNotificationDetails');
        Route::get('/disableNotification/{id}', 'ExecutiveController@companyAssociationExecutiveNotificationStatusRead');
         
    });
    
});
