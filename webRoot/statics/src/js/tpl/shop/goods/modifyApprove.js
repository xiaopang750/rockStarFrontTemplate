/*TMODJS:{"version":15,"md5":"de2bdf86cea143446739b90ce78e8d8a"}*/
define(function(require) {
    return require("../../templates")("shop/goods/modifyApprove", ' <div class="modify-box" script-bound="form-check" modify-box> <div class="ba-mb-40"> <span class="text">输入发货数量：</span> <div script-role="check-wrap"> <input type="text" class="form-control" approvenum form_check="sys" ischeck="true" name="approvenum" tip="此项为必填" wrong="请填写数字" re="(\\d+)"> </div> </div> <div class="ba-tc"> <a href="javascript:;" class="btn btn-primary" sc="approve-confirm" script-role="confirm-btn">确定</a> <a href="javascript:;" class="btn btn-danger" sc="close">取消</a> </div> </div>');
});