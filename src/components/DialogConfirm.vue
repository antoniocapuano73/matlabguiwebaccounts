<!--
    props:
        show
        title
        prompt
        actionOk()
        actionCancel()
-->
<template>
    <!-- Modal confirm -->
    <div class="modal-mask" role="document" v-show="show">
        <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                  <h3>{{title}}</h3>
              </div>
                <div class="modal-body">
                  {{prompt}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="modal-default-button" @click="doActionOk();">Ok</button>
                    <button type="button" class="modal-default-button" @click="doActionCancel();">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "DialogConfirm",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "Title"
        },
        prompt: {
            type: String,
            default: "Prompt"
        },
        actionOk: {
            type: Function,
            default: null
        },
        actionCancel: {
            type: Function,
            default: null
        },
    },
    methods: {
        doActionOk: function () {
            let that = this;

            try {
                if (typeof that.actionOk === 'function')
                    if (that.actionOk != null)
                        that.actionOk();
            } 
            catch (e) {

            }
        },
        doActionCancel: function () {
            let that = this;

            try {
                if (typeof that.actionCancel === 'function')
                    if (that.actionCancel != null)
                        that.actionCancel();
            } 
            catch (e) {

            }
        },
    }
};
</script>

<style scoped>

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 25rem;
	margin: 0px auto;

	background-color: #fff;

	border-radius: 4px;
	overflow: hidden;
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
	background-color:green;
	padding: 20px;
}

.modal-header h3 {
	margin: 0;
	color: white;
}

.modal-body {
	margin: 10px 0px;
	padding: 20px 20px;
  font-size: 150%;
}

.modal-footer {
	padding: 20px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);

	display: flex;
	justify-content: flex-end;
}

.modal-default-text {
  flex: 1;
}

.modal-default-button {
  cursor: pointer;

  background: green;
  color: white;

  border: none;
  border-radius: 3px;

  padding: 8px 16px;
  transition: 0.3s;

  width: 100px;
  margin-right: 5px;
}

</style>
