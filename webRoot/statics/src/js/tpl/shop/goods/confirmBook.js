/*TMODJS:{"version":3,"md5":"e5b028ab53b2ebe343e9799020a4451c"}*/
define(function(require) {
    return require("../../templates")("shop/goods/confirmBook", ' <div class="confirm-box" script-bound="form-check" confirm-box> <div class="ba-mb-10"> <span class="text">确认收货吗？</span> </div> <div class="ba-tc"> <a href="javascript:;" class="btn btn-primary" sc="book-confirm" script-role="confirm-btn">确定</a> <a href="javascript:;" class="btn btn-danger" sc="close">取消</a> </div> </div>');
});