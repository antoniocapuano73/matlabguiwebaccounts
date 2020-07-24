import axios from "axios"
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

/*
    ' GET admin/roles

    Array of:

    Public Class AdminRoleModel
        Public Id As Integer
        Public Name As String
    End Class
*/
function iif(condition,__true__,__false__) {
    if (condition)
        return __true__;
    else
        return __false__;
}

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

export function addAdminNewRole(successFunction,errorFunction) {

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

