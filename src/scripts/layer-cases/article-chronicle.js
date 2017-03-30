var NSINKA_Chronicle = {
    vars: {
    },
    init: function() {
        NSINKA_Chronicle.versions.tablet.isInited = false;
        $(window).on('resize__chronicle', function() {
            if(NSINKA_Global.is_smartphone()) {
                NSINKA_Chronicle.versions.mobile.init();
            } else {
                NSINKA_Chronicle.versions.tablet.init();
            }
        }).trigger('resize__chronicle');
    },
    versions: {
        mobile: {
            init: function() {
                this.layers.init();
            },
            layers: {
                init: function() {
                    var _this = this,
                        $handle = $('.chronicle--global>.chronicle__handle').first();

                    $handle[0].$layer = $handle.closest('article');
                    $handle[0].$layerContent = $handle[0].$layer.find('.article-content-wrapper');

                    $handle[0].minWidth = 0;
                    $handle[0].maxWidth = $handle[0].$layer[0].offsetWidth-$handle[0].offsetWidth;
                    $handle[0].opened = false;
                    $handle[0].touchstartWidth = $handle[0].maxWidth;

                    $handle[0].addEventListener('touchstart', this.eventHandler.touchstart, { passive : true });
                    $handle[0].addEventListener('touchmove', this.eventHandler.touchmove, { passive : true });
                    $handle[0].addEventListener('touchend', this.eventHandler.touchend, { passive : true });
                    $handle[0].addEventListener('touchcancel', this.eventHandler.touchend, { passive : true });

                    if(!NSINKA_Global.is_mobile()) {
                        $handle[0].isMouseDown = false;

                        $.each(['mousedown', 'mousemove', 'mouseup'], function(i, eventType) {
                            $handle[0].addEventListener(eventType, _this.eventHandler.touchSimulation, { passive : true });
                        });

                        window.dispatchEvent(new Event('mouseup'));
                    }
                },
                eventHandler: {
                    touchstart: function(e, preventThisPropagation) {
                        e.stopImmediatePropagation();

                        this.maxHeight = $(this).closest('article').width();

                        if(preventThisPropagation) {
                            return;
                        }

                        $(this).addClass('touchstart');

                        if(typeof e.detail != 'undefined') {
                            if(typeof e.detail.changedTouches != 'undefined') {
                                e.changedTouches = e.detail.changedTouches;
                            }
                        }

                        this.prevClientX = this.touchstartPositionX = (e.changedTouches ? (e.changedTouches[0].clientX-this.$layer.offset().left) : 0);
                        this.touchstartWidth = $(this).width();
                        this.resistance = 1.1;


                        console.log('touchstartPositionX', this.touchstartPositionX);

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

                        var currentClientX = e.changedTouches[0].clientX,
                            calc = currentClientX-(this.touchstartPositionX*2),
                            calc = this.touchstartWidth+calc;

                        //calc = e.changedTouches[0].clientX;
                        this.direction = this.prevClientX > currentClientX ? -1 : 1;

                        /*
                        if(this.direction != this.prevDirection) {
                            console.log(this.direction, this.prevDirection);
                            return;
                        }*/

                        if(this.$layer.attr('invertTouch') == 'true') {
                            this.direction = this.direction*-1;
                            calc = (calc-this.touchstartWidth)*-1;
                        }

                        var targetPosition = this.direction === 1 ? this.maxWidth : this.minWidth;

                        if(
                            (this.direction === 1 && calc >= this.maxWidth ) ||
                            (this.direction === -1 && calc <= this.minWidth )
                        ) {
                            return;
                        }

                        this.$layer.css({
                            'transform': 'translateX(' + calc + 'px)'
                        });

                        this.resistance = this.resistance*.1;
                        this.prevClientX = currentClientX;

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
                        this.$layer.removeClass('touchstart').removeClass('touchmove').addClass('touchend');
                        this.touchstartPositionX = 0;

                        if(this.direction === 1) {
                            this.$layer.parent().trigger('layer-opened');
                            var finalWidth = this.maxWidth;
                            this.opened = true;
                            this.$layerContent.trigger('moveTransitionStatus', 100);
                        } else {
                            this.$layer.parent().trigger('layer-closed');
                            var finalWidth = this.minWidth;
                            this.opened = false;
                            this.$layerContent.trigger('moveTransitionStatus', 0);
                        }
                        var _this = this;
                        this.$layer.css({
                            'transform': 'translateX(' + finalWidth + 'px)'
                        }).one(transitionEndTrigger, function() {
                            $(this).removeClass('touchend');
                            if(_this.opened) {
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
            }
        },
        tablet: {
            init: function() {
                if(!this.isInited) {
                    this.isInited = true;
                    this.prepareData();
                    this.scrollSync();
                    this.range();
                }
            },
            prepareData: function() {
                $('.chronicle__list').each(function() {
                    var $chronicleList = $(this),
                        data = {};

                    $('dt', this).each(function() {
                        var $this = $(this),
                            $dd = $this.next('dd'),
                            thisYear = $(this).text()*1;

                        data[thisYear] = {};

                        $dd.find('.chronicle__list__month').each(function() {
                            var $this = $(this),
                                thisMonth = $this.data('month'),
                                thisTeaser = $this.data('teaser') || ($this.text().substr(0, 200)+' …');

                            if(typeof data[thisYear][thisMonth] == 'undefined') {
                                data[thisYear][thisMonth] = [];
                            }

                            data[thisYear][thisMonth].push({
                                teaser : thisTeaser,
                                content : $this.html()
                            });
                        });

                        for(var i = 1; i <= 12; i++) {
                            var $monthDiv = $('<div class="chronicle__list__month chronicle__list__month--tiny">');
                            $dd.append($monthDiv);
                            $.each(data[thisYear][i], function(i, entries) {
                                var $dot = $('<div class="chronicle__list__month__dot">');
                                $monthDiv.append($dot);
                            });
                        }
                    });

                    console.log(data);
                });
            },
            scrollSync: function() {
                $('.chronicle__container').scroll(function() {
                    var $this = $(this),
                        $article = $this.closest('.content'),
                        $containers = $article.find('.chronicle__container').not($this);

                    $containers.scrollLeft($this.scrollLeft());
                });
            },
            range: function() {

                $('input[type="range"]').rangeslider({
                    polyfill: false,

                    //handleClass: 'chronicle__rangeslider__handle'
                });
            }
        }
    }
}
