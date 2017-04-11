var F_UI = {
    vars: {
        colorSchemes : [
            ['#505551', '#a7d3af', '#d0e3d4'],
            ['#6b4c5b', '#d3a7bc', '#edd9e3'],
            ['#3e4664', '#a5aed1', '#ccd1e3'],
            ['#684949', '#c49a9a', '#dfc6c6'],
        ]
    },
    init: function() {
        this.header.nav.burger();
        F_UI.body.updateColorSchemes();
    },
    header: {

        nav: {
            burger: function() {
                $('.hamburger').click(function(e) {
                    e.preventDefault();
                    var $this = $(this),
                        $body = $('body'),
                        activeClass = 'is-active',
                        navOpenClass = 'nav-is-open';

                    if($this.hasClass(activeClass)) {
                        $body.removeClass(navOpenClass);
                        $this.removeClass(activeClass);
                    } else {
                        $body.addClass(navOpenClass);
                        $this.addClass(activeClass);
                    }
                });
            }
        }
    },
    body: {
        updateColorSchemes: function(global) {
            var colorSchemes = F_UI.vars.colorSchemes,
                selectedColors = F_UI.body.getRandColorScheme(),
                $css = $('#colorScheme');
            console.log(selectedColors);
            $newCSS = $(F_Global.tmpl('colorSchemesCSS', {
                color1 : selectedColors[0],
                color2 : selectedColors[1],
                color3 : selectedColors[2]
            } ))

            if($css.length) {
                $css.replaceWith($newCSS);
            } else {
                $('body').prepend($newCSS);
            }
        },
        getRandColorScheme: function() {
            var colorSchemes = F_UI.vars.colorSchemes;
            return colorSchemes[(Math.floor((Math.random() * colorSchemes.length) + 1)-1)];
        },
        tooltip: {
            $tootltip: false,
            show: function($target, content) {
                if(F_UI.body.tooltip.$tootltip.length) {
                    F_UI.body.tooltip.$tootltip.remove();
                }

                F_UI.body.tooltip.$tootltip = $(F_Global.tmpl('factTooltip', content ));

                $target.closest('article').append(F_UI.body.tooltip.$tootltip);

                $(window).on('resize__tooltip', function() {
                    F_UI.body.tooltip.$tootltip.css({
                        left: ($target.offset().left+($target.width()/2))-(F_UI.body.tooltip.$tootltip.width()/2),
                        top: $target.offset().top-($target.height()/2)
                    })
                }).trigger('resize__tooltip');

            },

        }
    }
}
