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

function iif(condition,__true__,__false__) {
    if (condition)
        return __true__;
    else
        return __false__;
}

/*
    FILTERUSER SECTION

    Public Class FilterUser
        Public IdCompany As Integer
    End Class

*/
function FilterUser(idCompany) {
    this.IdCompany = idCompany;
}

/*
    ADMINROLEUSER SECTION

    Public Class AdminRoleUserModel
        Public Id As String
        Public Name As String
        Public Active As Boolean
    End Class
*/

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

export function getCompanyList(success,error) {

    axios
      .get(accountControllerURL +'/companies/list')
      .then(function (result){
        if (typeof success === 'function') {
            try {
                /*
                    array of AdminRoleModel object
                */
                let list = [];

                if (result) {
                    if (result.data)
                        list = result.data;
                }

                success(list);
            }
            catch (e){
                console.log("AccountController.js function getCompanyList");
                console.log(e);
            }
        }
      })
      .catch(function (e) {
        if (typeof error === 'function')
            try {
                error(e);
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

/*
    USER SECTION

    SELECT TOP 1000 [Id]
        ,[HasTemporaryPassword]
        ,[Email]
        ,[EmailConfirmed]
        ,[PasswordHash]
        ,[SecurityStamp]
        ,[PhoneNumber]
        ,[PhoneNumberConfirmed]
        ,[TwoFactorEnabled]
        ,[LockoutEndDateUtc]
        ,[LockoutEnabled]
        ,[AccessFailedCount]
        ,[UserName]
        ,[Company_Id]
        ,[Settings_Id]
        ,[FirstName]
        ,[LastName]
        ,[Note]
        ,[Image]
        ,[Role]
    FROM [Users].[dbo].[AspNetUsers]

*/

export function IsUserModel(userModel) {
    let ret = false;

    if (userModel) {
        try {
            let Id   = userModel.Id;
            let Name = userModel.Email.trim();

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

export function UserModel(Id,Email) {
    this.Id       = iif(Id, Id, '');
    this.UserName = iif(Email,Email,'');
    this.Email    = iif(Email,Email,'');
}

/*
    Public Class UserRegisterModel
        Public Email As String

        ' **********************************
        ' IMPORTANTE
        '   Le proprietà:
        '       Password
        '       ConfirmPassowrd
        '
        ' sono definite solamente nella classe UserModel per gestire 
        ' (1) la registrazione di un nuovo utente
        ' (2) la password temporanea
        '
        ' Assolutamenta la classe ApplicationUser non deve contenere
        ' questa due proprità
        ' **********************************
        Public Property Password As String
        Public Property ConfirmPassword As String

        ' additional data
        Public CompanyId As Integer
    End Class
*/
export function UserRegisterModel() {
    this.Email           = '';
    this.Password        = '';
    this.ConfirmPassword = '';
    this.CompanyId       = -1;
}

/*
    Public Class UserRegisterMessageModel
        Public Succeeded As Boolean
        Public Message As String
    End Class
*/
export function UserRegisterResultModel() {
    this.Succeeded = false;
    this.Message   = '';
}

export function registerUser(item,success,error) {

    axios
        .post(accountControllerURL +'/Register',item)
        .then(function (result) {
            if (typeof success === 'function') {
                try {
                    let data = result.data;

                    /*
                        Public Class UserRegisterResultModel
                            Public Succeeded As Boolean
                            Public Message As String
                        End Class
                    */
                    success(data);
                }
                catch (e){
                    console.log("AccountController.js function registerUser");
                    console.log(e);
                }
            }
        })
        .catch(function (e) {
            if (typeof error === 'function')
                try {
                    error(e);
                }
                catch (e) {
                }
        })

}

export function getUserList(success,error) {

    axios
      .post(accountControllerURL +'/users/list',null)
      .then(function (result){
        if (typeof success === 'function') {
            try {
                /*
                    array of user object
                */
                let list = [];

                if (result) {
                    if (result.data)
                        list = result.data;
                }

                success(list);
            }
            catch (e){
                console.log("AccountController.js function getUserList");
                console.log(e);
            }
        }
      })
      .catch(function (e) {
        if (typeof error === 'function')
            try {
                error(e);
            }
            catch (e){
            }
      })
}

/*
    <HttpPost>
    <Route("users/roles/list")>
    <AllowAnonymous>
    Public Function GetUserRoleList(<FromBody()> ByVal ApplicationUser As ApplicationUser) As IEnumerable(Of AdminRoleUserModel)
*/
export function getUserRoleList(userModel,success,error) {

    axios
      .post(accountControllerURL +'/users/roles/list',userModel)
      .then(function (result){
        if (typeof success === 'function') {
            try {
                /*
                    array of user object
                */
                let list = [];

                if (result) {
                    if (result.data)
                        list = result.data;
                }

                success(list);
            }
            catch (e){
                console.log("AccountController.js function getUserList");
                console.log(e);
            }
        }
      })
      .catch(function (e) {
        if (typeof error === 'function')
            try {
                error(e);
            }
            catch (e){
            }
      })
}

export function getUserListByIdCompany(idCompany,success,error) {

    axios
      .post(accountControllerURL +'/users/list',new FilterUser(idCompany))
      .then(function (result){
        if (typeof success === 'function') {
            try {
                /*
                    array of user object
                */
                let list = [];

                if (result) {
                    if (result.data)
                        list = result.data;
                }

                success(list);
            }
            catch (e){
                console.log("AccountController.js function getUserList");
                console.log(e);
            }
        }
      })
      .catch(function (e) {
        if (typeof error === 'function')
            try {
                error(e);
            }
            catch (e){
            }
      })
}

/*
    <HttpPost>
    <Route("user/new")>
    <AllowAnonymous>
    Public Function addUser() As Boolean
*/

export function addUserByIdCompany(idCompany,success,error) {

    axios
        .post(accountControllerURL +'/users/new',new FilterUser(idCompany))
        .then(function (result) {
            if (typeof success === 'function') {
                try {
                    let item = result.data;
                    success(item);
                }
                catch (e){
                    console.log("AccountController.js function addUser");
                    console.log(e);
                }
            }
        })
        .catch(function (e) {
            if (typeof error === 'function')
                try {
                    error(e);
                }
                catch (e) {
                }
        })

}

export function addUser(success,error) {

    axios
        .post(accountControllerURL +'/users/new')
        .then(function (result) {
            if (typeof success === 'function') {
                try {
                    let item = result.data;
                    success(item);
                }
                catch (e){
                    console.log("AccountController.js function addUser");
                    console.log(e);
                }
            }
        })
        .catch(function (e) {
            if (typeof error === 'function')
                try {
                    error(e);
                }
                catch (e) {
                }
        })

}

/*
    <HttpPost>
    <Route("users/delete")>
    <AllowAnonymous>
*/

export function deleteUser(item,success,error) {

    try {
        axios
        .post(accountControllerURL +'/users/delete',item)
        .then(function (result){
            if (typeof success === 'function') {
                try {
                    let isItemDeleted = result.data;
                    success(isItemDeleted);
                }
                catch (e){
                    console.log("AccountController.js function deleteUser");
                    console.log(e);
                }
            }
        })
        .catch(function (e) {
            if (typeof error === 'function')
                try {
                    error(e);
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

export function updateUser(item,success,error) {

    axios
        .post(accountControllerURL +'/users/update',item)
        .then(function (result) {
            if (typeof success === 'function') {
                try {
                    let isItemUpdated = result.data;
                    success(isItemUpdated);
                }
                catch (e){
                    console.log("AccountController.js function updateUser");
                    console.log(e);
                }
            }
        })
        .catch(function (e) {
            if (typeof error === 'function')
                try {
                    error(e);
                }
                catch (e) {
                }
        })

}
