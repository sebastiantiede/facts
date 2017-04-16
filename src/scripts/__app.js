var transitionEndTrigger = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

$(window).ready(function() {
    F_Global.init();
    F_UI.init();
    F_Git.init();
    F_Facts.init();
    F_Local.init();
}).scroll(function() {
}).resize(function() {
    $(this).trigger('resize__tooltip');
});
