<!--
    props:
        title
        category
        item

        onConfirm(item)
        onCancel()
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
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Id</label>
              <md-input v-model="m_item.Id" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Name</label>
              <md-input v-model="m_item.Name" type="text"></md-input>
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
  copyObj
  } from "@/lib/utility/utility.js"

import {
  CompanyModel,
  IsCompanyModel,
  updateCompany
  } from "@/api/Accounts/AccountController.js"

export default {
  name: "CompanyEdit",
  data: function() {
    return {
      m_item: new CompanyModel(),
    };
  },
  props: {
    title: {
      type: String,
      default: "Edit Company"
    },
    category: {
      type: String,
      default: "Complete/Modify the company"
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

      copyObj(that.m_item,that.item);
  },
  methods: {
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

        let error = function() {
          copyObj(that.m_item,that.item);
        };

        updateCompany(that.m_item,success,error);

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

          copyObj(that.m_item,nv);
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