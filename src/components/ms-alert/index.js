require('./_index.sass');
avalon.component('ms-alert',{
    template: '' +
        '<div class="alert-wrapper" :visible="show">' +
            '<div class="modal-mask"></div>' +
            '<div class="modal-wrap">' +
                '<div class="modal">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">提示</div>' +
                        '<div class="modal-body clearfix">' +
                            '<div class="icon-error">' +
                                '<i class="sd-icon-close-o"></i>' +
                            '</div>' +
                            '<div class="body-content">{{info}}</div>' +
                        '</div>' +
                        '<div class="modal-footer clearfix">' +
                            '<button class="btn-confirm" ms-click="confirm">确定</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>',
    defaults: {
        show: false,
        info: '',
        onInit: function() {
        },
        confirm: function () {
            this.show = false;
        }
    }
});
