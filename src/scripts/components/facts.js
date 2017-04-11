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

                    console.log($slide);
                    $slide.find('h2,h1').click(function() {
                        F_UI.body.tooltip.show($('h2,h1', $(this).parent()).first(), $(this).closest('article')[0].factData);
                    })

                    console.log(F_Facts.vars.$slideshow.find('.slick-current'));
                });
            });

            F_Facts.vars.$slideshow.on('afterChange', function() {
                F_UI.body.updateColorSchemes();
                F_Facts.vars.$slideshow.find(':not(.slick-current)').scrollTop(0);
                console.log(this);

                var $slide = F_Facts.vars.$slideshow.find('.slick-current'),
                    thisFact = $slide[0].factData,
                    thisFile = $slide[0].factFile;
                console.log($slide.find('h1').text(), thisFile.replace(/.*(\/[^\/]+\/[^\/]+)$/, '$1'));
                F_Global.history.set($slide.find('h1').text(), window.location.origin + thisFile.replace(/.*(\/[^\/]+\/[^\/]+)$/, '#!$1'));
            });


        });

    },
    slide: {
        init: function($slide, fileContent) {
            var _this = this;
            $slide.scroll(function(e) {
                console.log($slide.find('.fact__relatives').offset().top-$slide.scrollTop());
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
                    console.log(fileContent.tags);
                    //$slide.find('.fact__relatives').append()
                    F_Git.search(fileContent.tags.join('+'), function(data) {
                        console.log(data._data);
                        if(!data._data.length) {
                            return;
                        }
                        console.log(getRandItemsOfArray(data._data, 3));
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
                console.log($slide.find('.fact__relatives .relatives'), $reference);
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
    array = array[Math.floor(Math.random()*array.length)];
    console.log(length , aLength);
    if(length < aLength) {
        array = array.splice(0, length);
    }
    return array;
}