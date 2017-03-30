/**
* Description for NSINKA_Actions
* @private
* @property NSINKA_Actions
*/
var NSINKA_jQueryExtensions = {
    vars: {
    },
    init: function() {
        jQuery.fn.extend(this.functions);
    },
    functions: {
        clicktouch: function (fn) {
            return $(this).on('click',function() {
                $(this).trigger('touchstart',[true]);
            }).on('mousedown mousemove mouseup', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
            }).on('touchstart', fn);
        }

    }
}
