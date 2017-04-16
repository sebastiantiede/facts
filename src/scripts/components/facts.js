var F_Facts = {
    vars: {
    },
    init: function() {
        this.slideshow();
    },
    slideshow: function() {
        F_Facts.vars.$slideshow = $('#facts_slideshow');
        F_Git.searchFile('facts/de_DE', function(result) {
            F_Facts.vars.$slideshow.slick({
                prevArrow: '<button type="button" class="slick-prev material-icons">&#xE314;</button>',
                nextArrow: '<button type="button" class="slick-next material-icons">&#xE315;</button>'
            });

            $.each(result._data, function(i, entry) {
                F_Git.file(entry.html_url, function(fileContent) {
                    $slide = $(F_Global.tmpl('factArticle', fileContent ));
                    $slide[0].factFile = entry.html_url;
                    $slide[0].factData = fileContent;
                    F_Facts.vars.$slideshow.slick('slickAdd',F_Facts.slide.init($slide, fileContent));

                    $slide.find('h2,h1').click(function() {
                        F_UI.body.tooltip.show($('h2,h1', $(this).parent()).first(), $(this).closest('article')[0].factData);
                    })

                });
            });

            F_Facts.vars.$slideshow.on('afterChange', function() {
                F_UI.body.updateColorSchemes();
                F_Facts.vars.$slideshow.find(':not(.slick-current)').scrollTop(0);

                var $slide = F_Facts.vars.$slideshow.find('.slick-current'),
                    thisFact = $slide[0].factData,
                    thisFile = $slide[0].factFile;
                F_Global.history.set($slide.find('h1').text(), window.location.origin + thisFile.replace(/.*(\/[^\/]+\/[^\/]+)$/, '#!$1'));
            });


        });

    },
    slide: {
        init: function($slide, fileContent) {
            var _this = this;
            $slide.scroll(function(e) {
                if($slide.find('.fact__relatives').offset().top-$slide.scrollTop() <= 0) {
                    _this.references.init($slide, fileContent);
                }
            });
            return $slide;
        },
        references: {
            insertionTimeout: 0,
            init: function($slide, fileContent) {
                if(!$slide[0].referencesInited) {
                    $slide[0].referencesInited = true;
                    //$slide.find('.fact__relatives').append()
                    F_Git.search(fileContent.tags.join('+'), function(data) {
                        if(!data._data.length) {
                            return;
                        }
                        $.each(getRandItemsOfArray(data._data, 3), function(i, entry) {

                            F_Git.file(entry.html_url, function(fileContent) {
                                F_Facts.slide.references.reference(fileContent, $slide);
                            });
                        });
                    });
                }
            },
            reference: function(fileContent, $slide) {
                fileContent.backgroundColor = F_UI.body.getRandColorScheme()[1];
                var $reference = $(F_Global.tmpl('factArticleRelative', fileContent ));
                $slide.find('.fact__relatives .relatives').append($reference);
                setTimeout(function() {
                    $reference.addClass('is-active')
                }, F_Facts.slide.references.insertionTimeout);
                F_Facts.slide.references.insertionTimeout = F_Facts.slide.references.insertionTimeout+100;
            }
        }
    },

}

function getRandItemsOfArray(array, length) {
    var aLength = array.length;
    var j, x, i;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
    if(length < aLength) {
        array = array.splice(0, length);
    }
    return array;
}
