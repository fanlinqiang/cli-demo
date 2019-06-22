require('./_index.sass');
/*require('es5-shim');
require('es5-shim/es5-sham');
require("babel-polyfill");*/
var avalon = require('avalon2');
var utils = require('@/utils/index');
require ('@/components/ms-loading/index');
require ('@/components/ms-alert/index');
require ('@/components/ms-none/index');


avalon.config({debug: false});
var vm = avalon.define({
    $id: "page",
    title: 'test',
    loading: false,
    none: false,
    dataList: [
        {
            name: "test",
            age: '12'
        }
    ],
    error: {
        info: '缺少参数',
        showModal: false
    }
});

// 获取详情信息
function getData() {
    vm.loading = true;
    vm.none = false;
    $.ajax({
        type: 'POST',
        url: '',
        dataType: 'json',
        data: {},
        success: function (res) {

        },
        error: function () {
            vm.none = true;
        },
        complete: function () {
            vm.loading = false;
        }
    });
}

avalon.scan('page-wrapper');

//getData();


