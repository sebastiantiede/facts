/**
* Description for NSINKA_Layers
* @private
* @property NSINKA_Layers
*/
var NSINKA_Layers = {
    vars: {
        snapPoint: 50
    },
    init: function() {
        this.initHtmlLayerTag();
        $('layer').each(this.single);
        this.layerLinks();
        this.identifyLayers();

        /* Safari iOS browserhack inherit min-height*/
        var $content = $('main>.content');
        new ResizeSensor($content[0], function() {
            $content.trigger('browserhack_inherit_height');
        });

        var $article = $('layer>article');
        $('layer>article').each(function() {
            var $this = $(this);
            new ResizeSensor($this.parent()[0], function() {
                $this.trigger('_resize');
            });

            $this.on('_resize', function() {
                $this.css({ 'min-height' : $(window).height() - $this.offset().top });
            }).trigger('_resize');
        });

        $content.on('browserhack_inherit_height', function() {
            $(this).css('height', '').css('height', this.clientHeight);
        }).trigger('browserhack_inherit_height');

    },
    layerLinks: function($body) {
        $body = $body || $('body');
        $('a[href]').click(function(e) { e.preventDefault(); }).clicktouch(function(e) {
            e.preventDefault();
            NSINKA_Global.ajaxPage(this.href, NSINKA_Layers.prepareReceiverLayer);
        });
    },
    identifyLayers: function($body) {
        $body = $body || $('body');
        $('layer', $body).each(function() {
            this.dataset.id = $.map($(this).parents().filter('main,layer'), function(item) {
                return item.nodeName+(item.id?'#'+item.id:'');
            }).reverse().join('>')+'>'+this.nodeName+(this.id?'#'+this.id:'');
        });
    },
    prepareReceiverLayer: function($data) {
        $main = $($data.filter(function(item) {
            if(item.nodeName == 'MAIN') {
                return item;
            } else {
                return;
            }
        })[0]);

        NSINKA_Layers.identifyLayers($main);

        $('layer').each(function() {
            var $t = $(this),
                $ajaxSibling = $main.find('layer[data-id="'+$(this).data('id')+'"]');

            if($ajaxSibling.length) {
                var $tChildLayer = $(this).find('>layer'),
                    $sChildLayer = $ajaxSibling.find('>layer');
                if($sChildLayer.length && !$tChildLayer.length) {
                    $t[0].appendLayer($sChildLayer);
                } else if($tChildLayer.length && ($tChildLayer.data('id') != $sChildLayer.data('id'))) {
                    $tChildLayer[0].removeLayer(function() {
                        $t[0].appendLayer($sChildLayer);
                    });
                }
            } else {
                $(this).trigger('removeLayer');
            }
        });

        $layers = $($main[0]).find('layer');
    },
    initHtmlLayerTag: function() {
        var layerTag = document.createElement('layer');
        var layerContentTag = document.createElement('layer-content');
    },
    single: function() {
        this.vars = {
            $layerContent: $(this).find('>layer-content'),
            $layerContentHeightIndicator: $('<layer-height-indicator />')
        };

        if($(this).attr('disabled')) {
            return this;
        }
        this.vars.$layerContent.append( this.vars.$layerContentHeightIndicator);
        var $layerContentHeader = $(this).find('layer-content-header');
        this.vars.$handle = $layerContentHeader.length ? $layerContentHeader : this.vars.$layerContent;

        if(handle = $(this).attr('handle')) {
            this.vars.$handle = $(handle, this);
        }

        this.vars.$handle[0].minHeight = parseFloat(this.vars.$layerContent.css('min-height'));
        this.vars.$handle[0].maxHeight = this.vars.$layerContentHeightIndicator[0].offsetTop;

        this.vars.$handle[0].opened = ($(this).attr('opened')=='true') || false;

        this.vars.$handle[0].prevDirection = this.vars.$handle[0].opened ? -1 : 1;

        this.vars.$handle[0].$layer = $(this);
        this.vars.$handle[0].$layerContent = this.vars.$layerContent;

        this.vars.$layerContent.css({
            height: this.vars.$layerContent[0].opened?this.vars.$layerContent.height():this.vars.$layerContent[0].minHeight
        });


        this.vars.$handle[0].whileOpenClose =
            ($(this).attr('whileOpenClose')?$.map($(this).attr('whileOpenClose').split(','), function(id) {
                return $('#'+id);
            }):false);

        var _this = this;

        this.eventHandler = {
            touchstart: function(e, preventThisPropagation) {
                //e.preventDefault();
                e.stopImmediatePropagation();

                $(this).trigger('moveTransitionStatus', (($(this).height()/this.maxHeight)*100));

                this.maxHeight = this.$layer[0].vars.$layerContentHeightIndicator[0].offsetTop;

                if(preventThisPropagation) {
                    return;
                }

                $(this).addClass('touchstart');

                if(typeof e.detail != 'undefined') {
                    if(typeof e.detail.changedTouches != 'undefined') {
                        e.changedTouches = e.detail.changedTouches;
                    }
                }


                this.prevClientY = this.touchstartPositionY = (e.changedTouches ? (e.changedTouches[0].clientY-this.offsetTop) : 0);
                this.touchstartHeight = $(this).height();
                this.resistance = 1.1;

                        console.log('touchstartPositionY', this.touchstartPositionY);

                this.direction = this.opened?-1:1;

                if(!this.opened) {
                    $.each(this.whileOpenClose, function(i, $item) {
                        $item.trigger('closeLayer');
                    });
                }
                $(this).removeClass('open');
            },
            touchmove: function(e) {
                e.stopImmediatePropagation();
                $(this).removeClass('touchstart').addClass('touchmove');

                if(typeof e.detail != 'undefined') {
                    if(typeof e.detail.changedTouches != 'undefined') {
                        e.changedTouches = e.detail.changedTouches;
                    }
                }

                var currentClientY = e.changedTouches[0].clientY-this.offsetTop,
                    calc = currentClientY-this.touchstartPositionY,
                    calc = this.touchstartHeight+calc;

                this.direction = this.prevClientY > currentClientY ? -1 : 1;

                /*
                if(this.direction != this.prevDirection) {
                    console.log(this.direction, this.prevDirection);
                    return;
                }*/

                if(this.$layer.attr('invertTouch') == 'true') {
                    this.direction = this.direction*-1;
                    calc = (calc-this.touchstartHeight)*-1;
                }

                $(this).trigger('moveTransitionStatus', ((calc/this.maxHeight)*100));

                var targetPosition = this.direction === 1 ? this.maxHeight : this.minHeight;

                if(
                    (this.direction === 1 && calc >= this.maxHeight ) ||
                    (this.direction === -1 && calc <= this.minHeight )
                ) {
                    return;
                }

                this.$layerContent.css({
                    height: (calc)
                });

                this.resistance = this.resistance*.1;
                this.prevClientY = currentClientY;
            },
            touchend: function(e) {
                //e.preventDefault();
                /*
                if(this.direction != this.prevDirection) {
                    this.prevDirection = this.direction;
                    return;
                }*/

                this.prevDirection = this.direction;

                e.stopImmediatePropagation();
                this.$layerContent.removeClass('touchstart').removeClass('touchmove').addClass('touchend');
                this.touchstartPositionY = 0;

                if(this.direction === 1) {
                    this.$layerContent.parent().trigger('layer-opened');
                    var finalHeight = this.maxHeight;
                    this.opened = true;
                    this.$layerContent.trigger('moveTransitionStatus', 100);
                } else {
                    this.$layerContent.parent().trigger('layer-closed');
                    var finalHeight = this.minHeight;
                    this.opened = false;
                    this.$layerContent.trigger('moveTransitionStatus', 0);
                }

                this.$layerContent.css({
                    height: finalHeight
                }).one(transitionEndTrigger, function() {
                    $(this).removeClass('touchend');
                    if(_this.vars.$handle[0].opened) {
                        $(this).addClass('open');
                    }
                    $(window).trigger('layerChange');
                });
                $(window).trigger('layerChange');
            },
            touchSimulation: function(e) {
                var type = false;

                switch (e.type)
                {
                    case "mousedown":
                        this.isMouseDown = true;
                        type = "touchstart";
                        break;
                    case "mousemove":
                        if(this.isMouseDown) {
                            type = "touchmove";
                        } else {
                            type = false;
                        }
                        break;
                    case "mouseup":
                        this.isMouseDown = false;
                        type = "touchend";
                        if(this == window) {
                            window.currentTouchedElem.dispatchEvent(new Event('touchend'));
                            //$(window.currentTouchedElem).trigger('touchend');
                        }
                        break;
                    default: return;
                }



                if(type) {
                    window.currentTouchedElem = this;
                    var simulatedEvent = new CustomEvent(type, {
                        foo: 'dev',
                        detail: {
                            changedTouches: [{
                                clientX : e.clientX,
                                clientY : e.clientY
                            }]
                        }
                    });


                    simulatedEvent.test = 'test';

                    this.dispatchEvent(simulatedEvent);
                } else {
                    return;
                }
            }
        }

        if(this.vars.$layerContent[0].minHeight >= this.vars.$layerContent[0].maxHeight) {
            this.vars.$layerContent[0].dispatchEvent(new Event('touchend'));
            //this.vars.$layerContent.trigger('touchend', this.eventHandler.touchend);
            return this;
        }


        this.vars.$handle[0].addEventListener('touchstart', this.eventHandler.touchstart, { passive : true });
        this.vars.$handle[0].addEventListener('touchmove', this.eventHandler.touchmove, { passive : true });
        this.vars.$handle[0].addEventListener('touchend', this.eventHandler.touchend, { passive : true });
        this.vars.$handle[0].addEventListener('touchcancel', this.eventHandler.touchend, { passive : true });

        if(!NSINKA_Global.is_mobile()) {
            this.vars.$handle[0].isMouseDown = false;
            /*this.vars.$handle.on(
                'mousedown mousemove mouseup',
                this.eventHandler.touchSimulation
            );*/

            $.each(['mousedown', 'mousemove', 'mouseup'], function(i, eventType) {
                _this.vars.$handle[0].addEventListener(eventType, _this.eventHandler.touchSimulation, { passive : true });
            });

            window.dispatchEvent(new Event('mouseup'));
            //$(window).on('mouseup', this.eventHandler.touchSimulation);
        }

        $(this).on('closeLayer', function() {
            if(this.vars.$handle[0].opened) {
                this.vars.$handle[0].dispatchEvent(new Event('touchstart'));
                this.vars.$handle[0].dispatchEvent(new Event('touchend'));
                //this.vars.$layerContent.trigger('touchstart').trigger('touchend');
            }
        });

        $(this).on('openLayer', function() {
            if(!this.vars.$handle[0].opened) {
                this.vars.$handle[0].dispatchEvent(new Event('touchstart'));
                this.vars.$handle[0].dispatchEvent(new Event('touchend'));
            }
        });

        this.removeLayer = function(afterFn) {
            $(this).remove();
            if(typeof afterFn != 'undefined') {
                afterFn();
            }
        };

        this.appendLayer = function($layer) {
            $(this).append($layer);
            $layer.addClass('inactive');

            NSINKA_Layers.layerLinks($layer);

            $layer.each(NSINKA_Layers.single);
            setTimeout(function() {
                $layer.addClass('inactive--transition').removeClass('inactive').on(transitionEndTrigger, function() {
                    //$(this).removeClass('inactive--transition');
                });
            });
        };


    },

}
