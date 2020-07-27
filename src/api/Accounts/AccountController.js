import axios from "axios"
import {
    copyObj
} from "../../lib/utility/utility.js"

// const filterServiceURI = 'http://localhost:60000/api/Account';
const accountControllerURL = process.env.VUE_APP_ACCOUNT_CONTROLLER_URL;

/*
    Utility
*/
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function iif(condition,__true__,__false__) {
    if (condition)
        return __true__;
    else
        return __false__;
}

/*
    ADMINROLE SECTION

    Public Class AdminRoleModel
        Public Id As Integer
        Public Name As String
    End Class
*/

export function IsAdminRoleModel(adminRoleModel) {
    let ret = false;

    if (adminRoleModel) {
        try {
            let Id   = adminRoleModel.Id.trim();
            let Name = adminRoleModel.Name.trim();

            if ((Id) && (Name)) {
                // return
                ret = true;
            }
        } 
        catch (e) {

        }
    }

    return ret;
}

export function AdminRoleModel(Id,Name) {
    this.Id   = iif(Id, Id, '');
    this.Name = iif(Name,Name,'');
}

export function getAdminRoleList(successFunction,errorFunction) {

    axios
      .get(accountControllerURL +'/admin/roles/list')
      .then(function (result){
        if (typeof successFunction === 'function') {
            try {
                /*
                    array of AdminRoleModel object
                */
                let list = [];

                if (result) {
                    if (result.data)
                        list = result.data;
                }

                successFunction(list);
            }
            catch (e){
                console.log("AccountController.js function getRoleList");
                console.log(e);
            }
        }
      })
      .catch(function (error) {
        if (typeof errorFunction === 'function')
            try {
                errorFunction(error);
            }
            catch (e){
            }
      })
}

/*
    <HttpPost>
    <Route("admin/roles/new")>
    <AllowAnonymous>
    Public Function AddNewRole() As Boolean
*/

export function addAdminRole(successFunction,errorFunction) {

    axios
        .post(accountControllerURL +'/admin/roles/new')
        .then(function (result) {
            if (typeof successFunction === 'function') {
                try {
                    let adminRoleModel = result.data;
                    successFunction(adminRoleModel);
                }
                catch (e){
                    console.log("AccountController.js function addNewRole");
                    console.log(e);
                }
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                try {
                    errorFunction(error);
                }
                catch (e) {
                }
        })

}

/*
    <HttpPost>
    <Route("admin/role/delete")>
    <AllowAnonymous>
*/

export function deleteAdminRole(adminRoleModel,successFunction,errorFunction) {

    try {
        axios
        .post(accountControllerURL +'/admin/roles/delete',adminRoleModel)
        .then(function (result){
            if (typeof successFunction === 'function') {
                try {
                    let isDeletedRole = result.data;
                    successFunction(isDeletedRole);
                }
                catch (e){
                    console.log("AccountController.js function deleteAdminRole");
                    console.log(e);
                }
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                try {
                    errorFunction(error);
                }
                catch (e){
                }
        })

    } catch (e) {
        if (typeof errorFunction === 'function')
            try {
                errorFunction(error);
            }
            catch (e) {
            }
    }
}

/*
    <HttpPost>
    <Route("admin/roles/update")>
    <AllowAnonymous>
    Public Function UpdateRole(<FromBody()> ByVal Role As AdminRoleModel) As Boolean
*/

export function updateAdminRole(adminRoleModel,successFunction,errorFunction) {

    axios
        .post(accountControllerURL +'/admin/roles/update',adminRoleModel)
        .then(function (result) {
            if (typeof successFunction === 'function') {
                try {
                    let isUpdatesAdminRole = result.data;
                    successFunction(isUpdatesAdminRole);
                }
                catch (e){
                    console.log("AccountController.js function addNewRole");
                    console.log(e);
                }
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                try {
                    errorFunction(error);
                }
                catch (e) {
                }
        })

}

/*
    COMPANY SECTION

    Public Class CompanyModel
        Public Property Id As Integer
        Public Property Name As String
        Public Property Address As String
        Public Property City As String
        Public Property Country As String
        Public Property PostalCode As String
        Public Property Image As String
        Public Property PhoneNumber As String
        Public Property FaxNumber As String
        Public Property ReferencePerson As String
    End Class

*/

export function IsCompanyModel(companyModel) {
    let ret = false;

    if (companyModel) {
        try {
            let Id   = companyModel.Id;
            let Name = companyModel.Name.trim();

            if ((Id) && (Name)) {
                // return
                ret = true;
            }
        } 
        catch (e) {
            console.log(e);
        }
    }

    return ret;
}

export function CompanyModel(Id,Name) {
    this.Id   = iif(Id, Id, '');
    this.Name = iif(Name,Name,'');
}

export function getCompanyList(successFunction,errorFunction) {

    axios
      .get(accountControllerURL +'/companies/list')
      .then(function (result){
        if (typeof successFunction === 'function') {
            try {
                /*
                    array of AdminRoleModel object
                */
                let list = [];

                if (result) {
                    if (result.data)
                        list = result.data;
                }

                successFunction(list);
            }
            catch (e){
                console.log("AccountController.js function getCompanyList");
                console.log(e);
            }
        }
      })
      .catch(function (error) {
        if (typeof errorFunction === 'function')
            try {
                errorFunction(error);
            }
            catch (e){
            }
      })
}

/*
    <HttpPost>
    <Route("companies/new")>
    <AllowAnonymous>
    Public Function AddCompany() As Boolean
*/

export function addCompany(successFunction,errorFunction) {

    axios
        .post(accountControllerURL +'/companies/new')
        .then(function (result) {
            if (typeof successFunction === 'function') {
                try {
                    let item = result.data;
                    successFunction(item);
                }
                catch (e){
                    console.log("AccountController.js function addCompany");
                    console.log(e);
                }
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                try {
                    errorFunction(error);
                }
                catch (e) {
                }
        })

}

/*
    <HttpPost>
    <Route("companies/delete")>
    <AllowAnonymous>
*/

export function deleteCompany(item,successFunction,errorFunction) {

    try {
        axios
        .post(accountControllerURL +'/companies/delete',item)
        .then(function (result){
            if (typeof successFunction === 'function') {
                try {
                    let isItemDeleted = result.data;
                    successFunction(isItemDeleted);
                }
                catch (e){
                    console.log("AccountController.js function deleteCompany");
                    console.log(e);
                }
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                try {
                    errorFunction(error);
                }
                catch (e){
                }
        })

    } catch (e) {
        if (typeof errorFunction === 'function')
            try {
                errorFunction(error);
            }
            catch (e) {
            }
    }
}

/*
    <HttpPost>
    <Route("companies/update")>
    <AllowAnonymous>
    Public Function UpdateRole(<FromBody()> ByVal Role As AdminRoleModel) As Boolean
*/

export function updateCompany(item,successFunction,errorFunction) {

    axios
        .post(accountControllerURL +'/companies/update',item)
        .then(function (result) {
            if (typeof successFunction === 'function') {
                try {
                    let isItemUpdated = result.data;
                    successFunction(isItemUpdated);
                }
                catch (e){
                    console.log("AccountController.js function updateCompany");
                    console.log(e);
                }
            }
        })
        .catch(function (error) {
            if (typeof errorFunction === 'function')
                try {
                    errorFunction(error);
                }
                catch (e) {
                }
        })

}
