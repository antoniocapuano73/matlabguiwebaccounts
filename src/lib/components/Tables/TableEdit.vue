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
      <md-card-header data-background-color="green">
        <h4 class="title"><b>{{title}}</b></h4>
        <p class="category"><b>{{category}}</b></p>
      </md-card-header>

      <md-card-content>

        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33" v-for="(value,propertyName,index) in m_item" :key="index">
            <md-field v-show="isFieldVisible(propertyName)">
              <label>{{propertyName}}</label>
              <md-input v-model="m_item[propertyName]" :disabled="propertyName.toLowerCase() === 'id'"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="button md-raised md-success" @click="doActionOk();">OK</md-button>
            <md-button class="button md-raised md-success" @click="doActionCancel();">Cancel</md-button>
          </div>

        </div>

      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import {
  isFunction,
  } from "@/lib/utility/Utility.js"

import {
  Datasource,
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
  methods: {
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
      FIELDS
    */
    isFieldVisible: function(propertyName) {
      let that = this;
      let ret  = false;

      if (!that.fields)
        that.fields = [];

      if (that.fields.length > 0) {
        for (var fieldName of that.fields) {
          try {
            let name1 = propertyName.toLowerCase().trim();
            let name2 = fieldName.toLowerCase().trim();

            if (name1 === name2) {
              ret = true;
              break;
            }

          }
          catch(e) {

          }
        }
      } else {
        // mostra tutti i campi
        ret = true;
      }

      return ret;
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
  }
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