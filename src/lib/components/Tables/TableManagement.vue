<!--
    props:
        title = {
          table: "table title",
          edit:  "edit title"
        }
        category = {
          table: "table category",
          edit:  "edit category"
        }

        textButtonItemAdd

        titleEdit
        categoryEdit

        fields = {
          table: ["Id","Name"],
          edit:  null
        }
        
        datasource

        onShowEdit    -> onshowedit(showItemEdit)
        onItem        -> onitem(item)
        onConfirmEdit -> onConfirmEdit(item)
        onCancelEdit
-->
<template>
  <div class="content">
    <md-card v-show="!showItemEdit">
      <md-card-header data-background-color="green">
        <h4 class="title"><b>{{title.table}}</b></h4>
        <p class="category"><b>{{category.table}}</b></p>
      </md-card-header>
      <md-card-content>
        <md-table v-model="tableList" table-header-color="green">
          <md-table-row slot="md-table-row" slot-scope="{ item }" @click="selectItem(item)">
            <md-table-cell :md-label="fieldText(field)" v-for="(field,index) in fields.table" :key="index">{{ item[fieldKey(field)] }}</md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="tableItemEdit(item);">
                <md-icon>create</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="tableItemDelete(item);">
                <md-icon>clear</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="button md-raised md-success" @click="tableItemNew()"><md-icon>add_box</md-icon>{{textButtonItemAdd}}</md-button>
        </div>
      </md-card-content>
    </md-card>

    <TableEdit
      :fields="fields.edit"
      :title="title.edit"
      :category="category.edit"
      :datasource="datasource"
      :item="selectedItem"
      :onConfirm="internal_onConfirmEdit"
      :onCancel="internal_onCancelEdit"
      v-show="showItemEdit"> 
    </TableEdit>

    <!-- Modal confirm -->
    <DialogConfirm 
      :show="showDialogConfirmItemDelete"
      :title="title.table"
      :prompt="textDialogConfirmItemDelete"
      :actionOk="dialogOk"
      :actionCancel="dialogCancel">

    </DialogConfirm>

  </div>
</template>

<script>
import {
  isFunction,
  } from "@/lib/utility/Utility.js"

import TableEdit from "@/lib/components/Tables/TableEdit.vue";
import {
  Datasource,
  key,text,TableField,TableFields,
  } from "@/lib/components/Tables/TableUtility.js"

import DialogConfirm from "@/lib/components/Dialogs/DialogConfirm.vue"

export default { 
  /*
    PUNTI DI PERSONALIZZAZIONE:
        methods:
            updateList
            isItem
            tableItemNew
            confirmItemDelete

  */

  name: "TableManagement",
  components: {
    DialogConfirm,
    TableEdit,
  },
  props: {
    fields: {
      type: Object,
      default: function() { return {
        table: ["Id","Name"],
        edit: null,
        }},
    },
    datasource: {
      type: Function,
      default: null,
    },
    title: {
      type: Object,
      default: function() { return {
        table:"TableName",
        edit: "Edit Table",
        }},
    },
    category: {
      type: Object,
      default: function() { return {
        table: "Complete/Modify the table",
        edit: "Complete/Modify the row",
        }},
    },
    textButtonItemAdd: {
      type: String,
      default: "New Row" 
    },
    onShowEdit: {
      type: Function,
      default: null
    },
    onItem: {
      type: Function,
      default: null
    },
  },
  data: function() {
    return {
      // context database
      contextDb: null,

      // vars
      tableList: [],  
      selectedItem: null,
      askConfirmToDelete: true,
      showItemEdit: false,

      // dialog
      showDialogConfirmItemDelete: false,
      textDialogConfirmItemDelete: "",
    };
  },
  mounted: function() {
      let that = this;

      // context Db
      that.createContextDb();

  },
  methods: {
    /*
      HTML TABLE SECTION
    */
    fieldKey: function(field) {
      return key(field);
    },
    fieldText: function(field) {
      return text(field);
    },
    /*
      EVENTS SECTION
    */
    set_showItemEdit: function(status) {
      let that = this;

      that.showItemEdit = status;
      that.raise_onShowEdit(status);
    },
    raise_onShowEdit: function(status) {
      let that = this;

      try {
        if (that.onShowEdit) {
          if (typeof that.onShowEdit === 'function')
            that.onShowEdit(status);
        }
      }
      catch(e) {

      }
    },
    set_selectedItem: function(item) {
      let that = this;

      that.selectedItem = item;
      that.raise_onItem(item);
    },
    raise_onItem: function(item) {
      let that = this;
      
      try {
        if (that.onItem) {
          if (typeof that.onItem === 'function')
            that.onItem(item);
        }
      }
      catch(e) {

      }
    },
    raise_onConfirmEdit: function(item) {
      let that = this;

      try {
        if (that.onConfirmEdit) {
          if (typeof that.onConfirmEdit === 'function')
            that.onConfirmEdit(item);
        }
      }
      catch(e) {

      }
    },
    raise_onCancelEdit: function() {
      let that = this;

      try {
        if (that.onCancelEdit) {
          if (typeof that.onCancelEdit === 'function')
            that.onCancelEdit();
        }
      }
      catch(e) {

      }
    },
    /*
      DATABASE CONTEXT
    */
    createContextDb: function() {
        let that = this;

        // creat contextDb
        if (isFunction(that.datasource)) {
          that.contextDb = that.datasource();
        }

        // successFunction
        that.updateList();
    },
    /*
        DATABASE INTERFACE
    */
    createModel: function() {
        let that = this;
        let ret  = null;

        try {
          if (that.contextDb) {
            ret = that.contextDb.createModel();
          }
        }
        catch(e) {
        }

        return ret;
    },
    isModel: function(item) {
        let that = this;
        let ret  = false;

        try {
          if (that.contextDb) {
            ret = that.contextDb.isModel(item);
          }
        }
        catch(e) {
        }

        return ret;
    },
    updateModel: function(item,success,error) {
        let that = this;

        try {
          if (that.contextDb) {
            that.contextDb.updateModel(item,success,error);
          }
        }
        catch(e) {
          // ERROR FUNCTION
          try {
            error();
          }
          catch(e) {
          }
        }

    },
    addModel: function(success,error) {
        let that = this;

        try {
          if (that.contextDb) {
            that.contextDb.addModel(success,error);
          }
        }
        catch(e) {
          // ERROR FUNCTION
          try {
            error();
          }
          catch(e) {
          }
        }

    },
    deleteModel: function(item,success,error) {
        let that = this;

        try {
          if (that.contextDb) {
            that.contextDb.deleteModel(item,success,error);
          }
        }
        catch(e) {
          // ERROR FUNCTION
          try {
            error();
          }
          catch(e) {
          }
        }

    },
    getListModel: function(success,error) {
        let that = this;

        try {
          if (that.contextDb) {
            that.contextDb.getListModel(success,error);
          }
        }
        catch(e) {
          // ERROR FUNCTION
          try {
            error();
          }
          catch(e) {
          }
        }

    },
    /*
        PUNTI DI PERSONALIZZAZIONE:
            methods:
                updateList
                isItem
                tableItemNew
                confirmItemDelete

    */
    updateList: function() {
      let that = this;

      that.getListModel(function(list) {
        that.tableList = list;
      });
    },
    /*
        PUNTI DI PERSONALIZZAZIONE:
            methods:
                updateList
                isItem
                tableItemNew
                confirmItemDelete

    */
    isItem: function (item) {
        let that = this;

        return that.isModel(item);
    },
    selectItem: function(item) {
      let that = this;

      if (item) {
        that.set_selectedItem(item);
        // console.log("selectAdminRoleModel");
      }
      else {
        that.set_selectedItem(null);
      }
    },
    /*
        PUNTI DI PERSONALIZZAZIONE:
            methods:
                updateList
                isItem
                tableItemNew
                confirmItemDelete

    */
    tableItemNew: function() {
      let that = this;

      that.addModel(function(item) {
        if (item) {
          that.selectItem(item);

          // Edit on
          that.set_showItemEdit(true);
        }
        else {
          // ERR
        }
      });
    },
    tableItemEdit: function(item) {
      let that = this;

      // Edit on
      that.set_showItemEdit(true);
    },
    tableItemDelete: function(item) {
      let that = this;

      if (that.askConfirmToDelete) {
        if (that.isItem(item)) {
          // the modal id="confirmDeleteModal"
          // manage the delete action
          that.textDialogConfirmItemDelete = 
            "Confirm to delete the item '" + item.Name + "' ?"
          that.showDialogConfirmItemDelete = true;
        }
      }
      else 
        that.confirmItemDelete(item);
    },
    dialogOk: function () {
      let that = this;

      that.confirmItemDelete(that.selectedItem);
    },
    dialogCancel: function () {
      let that = this;

      that.showDialogConfirmItemDelete = false;
    },
    /*
        PUNTI DI PERSONALIZZAZIONE:
            methods:
                updateList
                isItem
                tableItemNew
                confirmItemDelete

    */
    confirmItemDelete: function (item) {
      let that = this;

      if (that.isItem(item)) {
        that.deleteModel(item,function(isItemDeleted) {
          if (isItemDeleted) {
            that.selectItem(null);

            // api -> lasciare come ultima funzione
            that.updateList();
          }
          else {
            // ERR
          }
        })
      }

      that.showDialogConfirmItemDelete = false;

    },
    internal_onConfirmEdit: function(item) {
      let that = this;

      // Edit off
      that.set_showItemEdit(false);

      // event onConfirmEdit
      that.raise_onConfirmEdit(item);

      // api -> lasciare come ultima funzione
      that.updateList();
    },
    internal_onCancelEdit: function() {
      let that = this;

      // Edit off
      that.set_showItemEdit(false);

      // event onConfirmEdit
      that.raise_onCancelEdit();

      // api -> lasciare come ultima funzione
      that.updateList();
    },
  },
  watch: {
    datasource: function(nv) {
      let that = this;

      // context Db
      that.createContextDb();
    }
  },
};
</script>

<style scoped>
  .button {
    width: 150px;
  }
  .icon {
    width: 25px;
  }

  .category {
    font-size: 125%;
  }
</style>
