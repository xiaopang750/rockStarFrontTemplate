/*TMODJS:{"version":10,"md5":"cd95fe3b7e04ccb9039b027a2092352f"}*/
define(function(require) {
    return require("../../templates")("shop/goods/confirmDelivery", ' <div class="confirm-box" script-bound="form-check" confirm-box> <div class="ba-mb-10"> <span class="text">确认出库吗？</span> </div> <div class="ba-tc"> <a href="javascript:;" class="btn btn-primary" sc="delivery-confirm" script-role="confirm-btn">确定</a> <a href="javascript:;" class="btn btn-danger" sc="close">取消</a> </div> </div>');
});