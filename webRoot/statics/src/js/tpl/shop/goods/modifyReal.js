/*TMODJS:{"version":6,"md5":"2b05bcca9e5e9f1f7c880e7d36a3989a"}*/
define(function(require) {
    return require("../../templates")("shop/goods/modifyReal", ' <div class="modify-box" script-bound="form-check" modify-box> <div class="ba-mb-40"> <span class="text">输入实收数量：</span> <div script-role="check-wrap"> <input type="text" class="form-control" realnum form_check="sys" ischeck="true" name="realnum" tip="此项为必填" wrong="请填写数字" re="(\\d+)"> </div> </div> <div class="ba-tc"> <a href="javascript:;" class="btn btn-primary" sc="real-confirm" script-role="confirm-btn">确定</a> <a href="javascript:;" class="btn btn-danger" sc="close">取消</a> </div> </div>');
});