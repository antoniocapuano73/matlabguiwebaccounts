function iif(condition,__true__,__false__) {
    if (condition)
        return __true__;
    else
        return __false__;
}

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

export function TableField(key,text,type) {
    this.key  = key;
    this.text = iif(text,text,key);
    this.type = iif(type,type,"text");

}

export function TableFields() {
    let that = this;

    this.items = [];

    /*
    this.keys = function() {
        let ret = [];

        let items = this.items;
        try {
            for (i = 0; i < items.length; i++) {
               ret.push(items[i].key);
              }
        }
        catch(e) {
    
        }

        return ret;
    }

    this.texts = function() {
        let ret = [];

        let items = this.items;
        try {
            for (i = 0; i < items.length; i++) {
               ret.push(items[i].text);
              }
        }
        catch(e) {
    
        }

        return ret;
    }

    this.count = function() {
        let ret = 0;

        let items = this.items;
        try {
            ret = items.length;
        }
        catch(e) {
    
        }

        return ret;
    }
    */
   
    try {
        for (let i = 0; i < arguments.length; i++) {
            let field = arguments[i];
            if (IsTableField(field)) {
                that.items.push(field);
            }
          }
    }
    catch(e) {

    }

}

export function IsTableField(obj) {
    return (obj.constructor.name === "TableField");
}

export function IsTableFields(obj) {
    return (obj.constructor.name === "TableFields");
}

export function getFieldKey(obj) {
    let ret = null;

    if (IsTableField(obj)) {
        ret = obj.key;
    } else {
        ret = obj;
    }

    return ret;
}

export function getFieldText(obj) {
    let ret = null;

    if (IsTableField(obj)) {
        ret = obj.text;
    } else {
        ret = obj;
    }

    return ret;
}

export function getFieldType(obj) {
    let ret = null;

    if (IsTableField(obj)) {
        ret = obj.type;
    } else {
        ret = "text";
    }

    return ret;
}
export function getSelectedFields(obj,fields) {
    /*
        HTML TABLE SECTION
    */
    let ret  = null;

    try {
        if (obj) {
            let FIELDS = null;
    
            if (!fields) {
                fields = Object.getOwnPropertyNames(obj);
            } else {
    
            if (IsTableFields(fields)) {
                FIELDS = fields.items;
            }
            else
                FIELDS = fields;
            }
    
            /*
            Filter on existing fields
            */
            for (var field of FIELDS) {
                let propertyName = getFieldKey(field);
    
                if (obj.hasOwnProperty(propertyName)) {
                    if (!ret)
                        ret = [];
    
                ret.push(field);
                }
            }
    
    
        }

    } catch (e) {
        console.log("TableUtility.getSelectedFields error");
        console.log(e);
    }

    if (!ret)
        ret = [];

    return ret;
}
