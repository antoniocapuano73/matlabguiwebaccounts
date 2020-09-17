<!--
    props:
        theme
        title = {
          table: "table title",
          edit:  "edit title"
        }
        category = {
          table: "table category",
          edit:  "edit category"
        }

        textButtonItemAdd

        fields = {
          table: ["Id","Name"],
          edit:  null
        }
        
        display = {
          buttonEdit:   true,
          buttonDelete: true,
          buttonNew:    true
        }

        datasource

        // dialogBox
        externalForms = {
          newItem: false,
        }

        onBeforeNewItem
        onShowEdit      -> onshowedit(showItemEdit)
        onSelectedItem  -> onitem(item)
        onConfirmEdit   -> onConfirmEdit(item)
        onCancelEdit
-->
<template>
  <div class="content">
    <md-card v-show="!showItemEdit">
      <md-card-header :data-background-color="theme">
        <h4 class="title"><b>{{title.table}}</b></h4>
        <p class="category"><b>{{category.table}}</b></p>
      </md-card-header>
      <md-card-content>
        <md-table v-model="tableList" :table-header-color="theme">
          <md-table-row slot="md-table-row" slot-scope="{item}" @click="selectItem(item)">
            <md-table-cell :md-label="fieldText(field)" v-for="(field,index) in fields.table" :key="index">{{ item[fieldKey(field)] }}</md-table-cell>

            <md-table-cell md-label="" v-show="display.buttonEdit">
              <md-button :class="themeButtonColor()" @click="tableItemEdit(item);">
                <md-icon>create</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell md-label="" v-show="display.buttonDelete">
              <md-button :class="themeButtonColor()" @click="tableItemDelete(item);">
                <md-icon>clear</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div class="md-layout-item md-size-100 text-right" v-show="display.buttonNew">
          <md-button :class="themeButtonColor()" @click="tableItemNew()"><md-icon>add_box</md-icon>{{textButtonItemAdd}}</md-button>
        </div>
      </md-card-content>
    </md-card>

    <TableEdit
      :theme="theme"
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
  IsFunction,
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
    theme: {
      type: String,
      default: null,
    },
    fields: {
      type: Object,
      default: function() { return {
        table: ["Id","Name"],
        edit: null,
        }},
    },
    display: {
      type: Object,
      default: function() { return {
        buttonEdit:   true,
        buttonDelete: true,
        buttonNew:    true
        }},
    },
    externalForms: {
     type: Object,
      default: function() { return {
        newItem:   false,
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
    onBeforeNewItem: {
      type: Function,
      default: null
    },
    onShowEdit: {
      type: Function,
      default: null
    },
    onSelectedItem: {
      type: Function,
      default: null
    },
    onConfirmEdit: {
      type: Function,
      default: null
    },
    onCancelEdit: {
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
      THEME SECTION
    */
    themeButtonColor: function() {
      /*
            [data-background-color="purple"],
            .md-tabs.md-primary .md-tabs-navigation{
                background: linear-gradient(60deg, $purple-400, $purple-600);
                @include shadow-big-color($brand-primary);
            }

            [data-background-color="blue"],
            .md-tabs.md-info .md-tabs-navigation{
                background: linear-gradient(60deg, $blue-400, $blue-600);
                @include shadow-big-color($brand-info);
            }

            [data-background-color="green"],
            .md-tabs.md-success .md-tabs-navigation{
                background: linear-gradient(60deg, $green-400, $green-600);
                @include shadow-big-color($brand-success);
            }

            [data-background-color="orange"],
            .md-tabs.md-warning .md-tabs-navigation{
                background: linear-gradient(60deg, $orange-400, $orange-600);
                @include shadow-big-color($brand-warning);
            }

            [data-background-color="red"],
            .md-tabs.md-danger .md-tabs-navigation{
                background: linear-gradient(60deg, $red-400, $red-600);
                @include shadow-big-color($brand-danger);
            }

            ...

            &.md-default{
                @include btn-styles($gray-light);
            }

            &.md-primary{
              @include btn-styles($brand-primary);
            }
            &.md-info{
              @include btn-styles($brand-info);
            }
            &.md-success{
              @include btn-styles($brand-success);
            }
            &.md-warning{
              @include btn-styles($brand-warning);
            }
            &.md-danger{
              @include btn-styles($brand-danger);
            }          
      */

      let that = this;

      let ret = "md-default";

      switch(that.theme) {
        case "purple":
          ret = "md-primary";
          break;
        case "blue":
          ret = "md-info";
          break;
        case "green":
          ret = "md-success";
          break;
        case "orange":
          ret = "md-warning";
          break;
        case "red":
          ret = "md-danger";
          break;
      }

      return ret;

    },
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
      that.raise_onSelectedItem(item);
    },
    raise_onSelectedItem: function(item) {
      let that = this;
      
      try {
        if (that.onSelectedItem) {
          if (typeof that.onSelectedItem === 'function')
            that.onSelectedItem(item);
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
    raise_onBeforeNewItem: function() {
      let that = this;

      try {
        if (that.onBeforeNewItem) {
          if (typeof that.onBeforeNewItem === 'function')
            that.onBeforeNewItem();
        }
      }
      catch(e) {

      }
    },
    /*
      EXTERNAL FORMS
    */
    existingFormNewItem: function() {
      let that = this;
      let ret  = false;

      try {
        ret = that.externalForms.newItem;

      } catch (e) {
        console.log("TableManagement.existingFormNewItem.error");
        console.log(e);
      }

      return ret;
    },
    /*
      DATABASE CONTEXT
    */
    createContextDb: function() {
        let that = this;

        // creat contextDb
        if (IsFunction(that.datasource)) {
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
      let canUseCustomFormNewItem = that.existingFormNewItem();

      if (canUseCustomFormNewItem == false) {
        that.raise_onBeforeNewItem();

        /*
          Non esiste un form personalizzato per creare un nuovo item.
          Si richiama la funzione api che crea un ITEM VUOTO
        */
        that.addModel(function(item) {
          that.tableSelectItem(item);
        });

      } else {
        that.raise_onBeforeNewItem();

        /*
          ESISTE FORM PERSONALIZZATO PER CREARE NUOVO ITEM
        */

      }

    },
    tableSelectItem: function(item) {
      if (item) {
        that.selectItem(item);

        // Edit on
        that.set_showItemEdit(true);
      }
      else {
        // ERR
      }
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
          that.textDialogConfirmItemDelete = that.dialogText(item);
          that.showDialogConfirmItemDelete = true;
        }
      }
      else 
        that.confirmItemDelete(item);
    },
    dialogText: function(item) {
      let that = this;
      let text = null;
      
      try {
        if (item) {
          let i=0;
          for (var field of that.fields.table) {
            let key = that.fieldKey(field);

            if (item.hasOwnProperty(key)) {
              let partialText = item[key];

              if (partialText)
                if (i===0) {
                  text = 'Do you confirm to delete: ' + partialText;
                } else {
                  text = text + ' - ' + partialText;
                };

              i=i+1;
            }          
          }

          if (i !== 0)
            text = text + ' ?';
        }
      } catch (e) {
        console.log('TableManagement.dialogText function');
        console.log(e);
      }

      return text;
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

  .icon {
    width: 25px;
  }

  .category {
    font-size: 125%;
  }
</style>
