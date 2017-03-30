/**
* Description for NSINKA_Actions
* @private
* @property NSINKA_Actions
*/
var NSINKA_Actions = {
    vars: {
    },
    init: function($body) {
        $body = $body || $('body');
        $('*[data-jsaction]', $body).add($body.filter('[data-jsaction]')).each(this.__triggerAction);
    },
    __triggerAction: function() {
        var $this = $(this),
            jsaction = $this.data('jsaction');

        $.each(jsaction.match(/\w+(\([^\)]+\))?/g), function(i, fn) {
            var attrs = fn.replace(/^\w+\(|\)$/g, '').split(','),
                fn = fn.match(/^\w+/)[0];
            if(typeof NSINKA_Actions.functions[fn] != 'undefined') {
                NSINKA_Actions.functions[fn]($this, attrs);
            } else {
                console.error('not found! function NSINKA_Actions.functions.'+fn+'('+attrs.join(',')+')');
            }
        });
    },
    functions: {
        openmenu: function($this, attrs) {
            $this.clicktouch(function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var $html = $('html'),
                    opened_class = 'nav_open',
                    button_active_class = 'is-active';
                if($html.hasClass(opened_class)) {
                    $this.removeClass(button_active_class);
                    $html.removeClass(opened_class);
                } else {
                    $this.addClass(button_active_class);
                    $html.addClass(opened_class);
                }
            });
        },
        transformlogo: function($this) {
            $this.on('moveTransitionStatus', function(e, percentage) {
                if(percentage>0) {
                    $this.closest('layer').removeClass('transformed').find('#logo__container span')/*.fadeIn()*/;
                } else {
                    $this.closest('layer').addClass('transformed').find('#logo__container span')/*.fadeOut(function() {
                        //$(this).hide();
                    })*/;
                }
            });
        },
        cloneHeader: function($this) {
            $(window).on('scroll__header', function() {
                if($(window).scrollTop()>2) {
                    $this.trigger('closeLayer');
                }
            });

            //var $logo = $this.find('#logo__container');
            //$logo.after($logo.clone(true,true).addClass('clone'));
        },
        startDirections: function($this) {
            $this.clicktouch(NSINKA_Map.startDirections);
        },
        receiveRouteDuration: function($this) {
            $(window).on('routeHasBeenCalculated', function(e, route) {
                calcDuration(route);
                showWaypoints(route);
            });

            function calcDuration(route) {
                var duration = 0;

                if(!Object.keys(route).length) {
                    return;
                }

                $.each(route.routes[0].legs, function(i, waypoint) {
                    duration += waypoint.duration.value;
                });

                $this.text((Math.round((duration/60/60)*4)/4)+' Std.');

            }

            function showWaypoints(route) {
                var $tmpl = $(NSINKA_Global.tmpl('routeSettings', {
                    directions: NSINKA_Map.vars.waypoints,
                    routes: NSINKA_Map.vars.routes,
                    currentRoute: NSINKA_Map.vars.currentRoute,
                }));

                $this.closest('layer-content').find('layer-content-opened').html('').append($tmpl);

                $tmpl.find('li').each(function(i) {
                    this.mapData = NSINKA_Map.vars.waypoints[i];
                });

                $tmpl.find('ul').sortable({
                    placeholder: "placeholder",
                    stop: function(event,ui){
                        NSINKA_Map.vars.waypoints = [];
                        $tmpl.find('li').each(function() {
                            NSINKA_Map.vars.waypoints.push(this.mapData);
                        });
                        NSINKA_Map.initCustomRoute();
                        NSINKA_Map.genRoute();
                    },
                    axis: "y",
                    helper: 'clone',
                    handle: '.drag-handle'
                });

                NSINKA_Actions.init($tmpl);
            }
        },
        routeSettings: function($this) {
            $this.find('a.deactivate').click(function() {
                var deactivatedClass = 'deactivated',
                    $this = $(this),
                    $row = $this.closest('li');


                if($row.hasClass(deactivatedClass)) {
                    var inactive = false;
                    $row.removeClass(deactivatedClass);
                } else {
                    var inactive = true;
                    $row.addClass(deactivatedClass);
                }

                $changeIcon = $this.data('change-icon');
                $this.data('change-icon', $this.text());
                $this.text($changeIcon);

                NSINKA_Map.vars.waypoints[$row.data('location-id')].inactive = inactive;

                NSINKA_Map.initCustomRoute();
                NSINKA_Map.genRoute();

            })
        },
        search: function($this) {
            $this.find('button').clicktouch(function(e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                var $form = $(this).closest('form'),
                    $input = $form.find('input[type="search"]'),
                    activeClass = 'active';
                if($form.hasClass(activeClass)) {
                    $form.removeClass(activeClass);
                    $input.blur();
                } else {
                    $form.addClass(activeClass);
                    $input.focus();
                }
            });
        },
        openLocation: function($this) {

            $this.click(function() {
                var $tmpl = $(NSINKA_Global.tmpl('location', {directions : NSINKA_Map.vars.waypoints}));

                $('body').prepend($tmpl);

                var $locations__wrapper = $tmpl.find('#locations__wrapper');

                $locations__wrapper.slick({
                    arrows: false,
                    variableWidth: true,
                    initialSlide: $this.closest('li').data('location-id')
                });

                //$tmpl.find('#location_close').slick('slickPrev');
                $tmpl.find('#location_prev,#location_next').click(function() {
                    if(this.id == 'location_next') {
                        $locations__wrapper.slick('slickNext');
                    } else {
                        $locations__wrapper.slick('slickPrev');
                    }
                });

                $tmpl.find('#location_close').click(function() {
                    $tmpl.removeClass('active');
                    $tmpl.one(transitionEndTrigger, function() {
                        $tmpl.remove();
                    });
                })

                setTimeout(function() {
                    $tmpl.addClass('active');
                },100);
            });
        },
        selectRoute: function($this) {
            $this.change(function() {
                NSINKA_Map.initRoute($(this).val());
                NSINKA_Map.genRoute();
            });
        },
        quicklinks: function($this) {
            var $header = $this.find('layer-content-header'),
                headerStandardValue = $header.text();
            $this.on('moveTransitionStatus', function(e, percentage) {
                if(percentage>0) {
                    $header.text(headerStandardValue);
                } else {
                    $header.text('Stadtrundgang');
                }
            });
        }

    }
}
