/*
    Example:
                    <template>

                        <TableManagement 
                            title="Companies"
                            category="Modify/Delete/Add Company"
                            titleEdit="Edit Company"
                            categoryEdit="Complete/Modify Company"
                            :datasource="createDatasource">
                        </TableManagement>

                    </template>

                    <script>

                    import {
                        CompanyModel,IsCompanyModel,
                        addCompany,
                        deleteCompany,
                        updateCompany,
                        getCompanyList,
                    } from "@/api/Accounts/AccountController.js"

                    import TableManagement from "@/lib/components/Tables/TableManagement.vue";
                    import {
                        Datasource,
                    } from "@/lib/components/Tables/TableUtility.js"

                    export default { 
                    name: "CompaniesManagement",
                    components: {
                    TableManagement,
                    },
                    data: function() {
                    return {

                    };
                    },
                    mounted: function() {
                        let that = this;


                    },
                    methods: {
                        createDatasource: function() {
                            return new Datasource(CompanyModel,IsCompanyModel,updateCompany,addCompany,deleteCompany,getCompanyList);
                        },
                    },
                    }

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