/*
    Example:
        methods: {
            createDatasource: function() {
            return new Datasource(AdminRoleModel,IsAdminRoleModel,updateAdminRole,addAdminRole,deleteAdminRole,getAdminRoleList);
            },

        <TableManagement 
            title="Admin Roles"
            category="Modify/Delete/Add Role"
            titleEdit="Edit Role"
            categoryEdit="Complete/Modify Role"
            :datasource="createDatasource">
        </TableManagement>

    Object:
        datasource: {
        type: Object,
        default: {
                constructorModel: function() {
                    return null;
                },
                isModel: function(item) {
                    return false;
                },
                updateModel: function(item,success,error) {
                    success(isUpdatedItem := false);
                },
                addModel: function(success,error) {
                    success(item := null);
                },
                deleteModel: function(item,success,error) {
                    success(isDeletedItem := false);
                },
                getListModel: function(success,error) {
                    success(list := null);
                }
            },
        },

*/

export function Datasource(constructorModel,isModel,updateModel,addModel,deleteModel,getListModel) {
    this.createModel  = function() {return new constructorModel();};
    this.isModel      = isModel;
    this.updateModel  = updateModel;
    this.addModel     = addModel;
    this.deleteModel  = deleteModel;
    this.getListModel = getListModel;
}