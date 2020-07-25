<!--
    props:
        title
        category
        adminRoleModel

        onSaved(adminRoleModel)
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
              <md-input v-model="m_adminRoleModel.Id" disabled></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Name</label>
              <md-input v-model="m_adminRoleModel.Name" type="text"></md-input>
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
  AdminRoleModel,
  IsAdminRoleModel,
  copyAdminRoleModel,
  updateAdminRole
  } from "@/api/Accounts/AccountController.js"

export default {
  name: "AdminRoleEdit",
  data: function() {
    return {
      m_adminRoleModel: new AdminRoleModel(),
    };
  },
  props: {
    title: {
      type: String,
      default: "Edit Role"
    },
    category: {
      type: String,
      default: "Complete/Modify the role"
    },
    adminRoleModel: {
      type: Object,
      default: null,
    },
    onSaved: {
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

      copyAdminRoleModel(that.m_adminRoleModel,that.adminRoleModel);
  },
  methods: {
    doActionOk: function () {
        let that = this;

        let success = function (isUpdatesAdminRole) {
          try {
            if (isUpdatesAdminRole) {
              if (typeof that.onSaved === 'function')
                  if (that.onSaved != null)
                      that.onSaved(that.m_adminRoleModel);

            } else {
              // cancel changing
              error();
            }
          }
          catch (e) {

          }
        };

        let error = function() {
          copyAdminRoleModel(that.m_adminRoleModel,that.adminRoleModel);
        };

        updateAdminRole(that.m_adminRoleModel,success,error);

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
      adminRoleModel: function(nv) {
          let that = this;

          copyAdminRoleModel(that.m_adminRoleModel,nv);
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