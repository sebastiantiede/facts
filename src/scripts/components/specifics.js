/**
* Description for NSINKA_Layers
* @private
* @property NSINKA_Layers
*/
var NSINKA_Specifics = {
    vars: {
    },
    init: function() {
        NSINKA_Specifics.specifics.desktop.mapLayout = NSINKA_Specifics.specifics.tablet.mapLayout;

        $(window).on('smartphone-actions tablet-actions desktop-actions', this.actions.attach);
    },
    actions: {
        attach: function(e) {

            var actions = Object.assign({}, NSINKA_Specifics.specifics.smartphone),
                actions = Object.assign(actions, NSINKA_Specifics.specifics.tablet),
                actions = Object.assign(actions, NSINKA_Specifics.specifics.desktop);

            $.each(actions, function(i, action) {
                NSINKA_Specifics.actions.remove(action);
            });
            $.each(NSINKA_Specifics.specifics[e.type.replace(/-actions$/,'')], function(i, action) {
                $.each(action.action.split(','), function(i, _action) {
                    action.$elem.on(_action, action.fn);
                });
                action.$elem.trigger('_now');
            });
        },
        remove: function(action) {
            $.each(action.action.split(','), function(i, _action) {
                action.$elem.off(action.action, action.fn);
                if(typeof action.fnOnRemove == 'function') {
                    action.fnOnRemove();
                }
            });

        }
    },
    specifics: {
        smartphone: {

        },
        tablet: {
            mapLayout: {
                /*
                 * Set map layout
                 */
                $elem : $(window),
                action: 'resize,_now',
                fn : function() {
                    var $quicklinks = $('#quicklinks'),
                        $parent = $quicklinks.parent(),
                        $map = $('#map'),
                        $footer = $('#footer');


                    new ResizeSensor($quicklinks[0], function() {
                        $map.trigger('_resize');
                    });

                    $map.on('_resize', function() {
                        $map.css({
                            height: $(window).height()-$parent.offset().top-$quicklinks.height()
                        });
                        $footer.css({
                            height: $(window).height()-$parent.offset().top-$quicklinks.height(),
                        });
                    }).trigger('_resize');
                },
                fnOnRemove: function() {
                    var $quicklinks = $('#quicklinks'),
                        $map = $('#map'),
                        $footer = $('#footer');

                    new ResizeSensor.detach($quicklinks[0]);
                    $map.css({
                        height: ''
                    }).off('_resize');
                    $footer.css({
                        height: '',
                    }).off('_resize');
                }
            }
        },
        desktop: {
        },
    }
}
