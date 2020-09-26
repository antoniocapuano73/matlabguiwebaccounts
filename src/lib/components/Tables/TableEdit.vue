<!--
    props:
        title
        category
        item

        fields
        datasource

        onConfirm(item)
        onCancel()

    Technical info:
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
                  success(false);
              },
              addModel: function() {
                  return null;
              },
              getListModel: function(success,error) {
                  success(null);
              }
          },
      },
-->
<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="theme">
        <h4 class="title"><b>{{title}}</b></h4>
        <p class="category"><b>{{category}}</b></p>
      </md-card-header>

      <md-card-content>

        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50" v-for="(item,index) in __FIELDS__" :key="index">
            <md-field>
              <label>{{fieldText(item)}}</label>
              <md-input :type="fieldType(item)" v-model="m_item[fieldKey(item)]"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button :class="themeButtonColor()" @click="doActionOk();">OK</md-button>
            <md-button :class="themeButtonColor()" @click="doActionCancel();">Cancel</md-button>
          </div>

        </div>

      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import {
  IsFunction,
  } from "@/lib/utility/Utility.js"

import {
  Datasource,
  getFieldKey,
  getFieldText,
  getFieldType,
  TableField,
  TableFields,
  IsTableFields,
  getSelectedFields,
  } from "@/lib/components/Tables/TableUtility.js"

export default {
  name: "TableEdit",
  data: function() {
    return {
      m_item: null,
      contextDb: null,
    };
  },
  props: {
    theme: {
      type: String,
      default: null,
    },
    fields: {
      type: Array,
      default: function() {return []},
    },
    datasource: {
      type: Function,
      default: null,
    },
    title: {
      type: String,
      default: "Edit Table"
    },
    category: {
      type: String,
      default: "Complete/Modify the row"
    },
    item: {
      type: Object,
      default: null,
    },
    onConfirm: {
      type: Function,
      default: null,
    },
    onCancel: {
      type: Function,
      default: null,
    }
  },
  mounted: function() {
      let that = this;

      // creat contextDb
      that.createContextDb();

      // create an empty model (m_item)
      that.m_item = that.item;

  },
  computed: {
    /*
      HTML TABLE SECTION
    */
    __FIELDS__: function() {
      let that = this;
      return getSelectedFields(that.m_item,that.fields);
    },
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
      return getFieldKey(field);
    },
    fieldText: function(field) {
      return getFieldText(field);
    },
    fieldType: function(field) {
      return getFieldType(field);
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
    doActionOk: function () {
        let that = this;

        let success = function (isUpdatedItem) {
          try {
            if (isUpdatedItem) {
              if (typeof that.onConfirm === 'function')
                  if (that.onConfirm != null)
                      that.onConfirm(that.m_item);

            } else {
              // cancel changing
              error();
            }
          }
          catch (e) {

          }
        };

        that.updateModel(that.m_item,success);

    },
    doActionCancel: function () {
        let that = this;

        try {
            if (typeof that.onCancel === 'function')
                if (that.onCancel != null)
                    that.onCancel();
        } 
        catch (e) {

        }
    },
  },
  watch: { 
      item: function(nv) {
          let that = this;

          // refresh data
          // copyObj(that.m_item,nv);

          that.m_item = nv;
      },
      datasource: function(nv) {
        let that = this;

        // context Db
        that.createContextDb();
      },
  },
};
</script>

<style scoped>
  .button {
    width: 100px;
    margin-right: 5px;
  }
  .icon {
    width: 25px;
  }

  .category {
    font-size: 125%;
  }

</style>