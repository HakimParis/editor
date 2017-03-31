define(
    ['jquery', 'helper/mustache.min', 'fabric'],
    function ($, Mustache) {
        var setup;
        var addTextButton;
        var addTemplateButton;
        var editorOption;
        var setupCanvas;
        var canvas;
        var canvasText = [];
        var initPolices;
        var deleteText;

        var deleteText = function() {
            $('.js-editor').delegate('.js-delete-text', 'click', function (event) {
                var idText;
                event.stopPropagation();
                idText = $(this).parent().data('id-button')-1;
                if (idText in canvasText) {
                    canvas.remove(canvasText[idText]);
                    delete canvasText[idText];
                    $('.js-editor-text').filter(function() {
                        return $(this).data('id-button') === (idText + 1);
                    }).remove();
                }
                $('.js-canvas-control').empty();
            });
        };

        var initPolices = function () {
            WebFontConfig = {
                google: {
                    families: ['Space Mono', 'Open Sans Condensed', 'Aref Ruqaa', 'Indie Flower']
                },
                active: function() {
                  // do something
                  //setupCanvas();
                }
            };
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                      '://ajax.googleapis.com/ajax/libs/webfont/1.5.6/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        };

        addTemplateButton = function () {
            var template = $('#template').html();
            var textModification = $('#textModification').html();
            var tmp = Mustache.parse();
            var text;
            var top = 0;
            
            $('.js-panel-add-text').append(
                Mustache.render(
                    template,
                    {
                        current: canvasText.length + 1
                    }
                )
            );
            $('.js-canvas-control').html(
                Mustache.render(
                    textModification,
                    {
                        current: canvasText.length + 1
                    }
                )
            );
            for (i in canvasText) {
                top += canvasText[i].getBoundingRect().height;
            }

            text = new fabric.IText(
                'Saisissez votre text',
                {
                    top: top,
                    textAlign: 'center',
                    fontSize: 18,
                    numberText: canvasText.length + 1
                }
            );

            canvasText.push(text);
            canvas.add(text);
            canvas.setActiveObject(text);
        };

        setupCanvas = function () {
            canvas = new fabric.Canvas(
                'canvas',
                { 
                    width: 400, 
                    height: 500 
                }
            );
            canvas.on('object:selected', function (evt) {
                var objet = evt.target;
                $('.js-police').filter(
                    function () { 
                        return $(this).val() === objet.get('fontFamily');
                    }
                )
                .prop('checked', true);
                $('.js-font-size option[value=' + objet.get('fontSize') + ']')
                    .prop('selected', true);
            });
        };

        setup = function (config) {
            addTextButton = config.addText;
            $('.'+addTextButton).on('click', function(){
                addTemplateButton();
            });
            $('.js-editor')
                .delegate(
                    '.js-editor-text',
                    'click',
                    function () {
                        var idText = ($(this).data('id-button')-1);
                        var tmp = Mustache.parse();
                        var textModification = $('#textModification').html();
                        $('.js-canvas-control').html(
                            Mustache.render(
                                textModification,
                                {
                                    current: $(this).data('id-button')
                                }
                            )
                        );
                        if (idText in canvasText) {
                            canvas.setActiveObject(
                                canvasText[idText]
                            );
                        }
                    }
                );
            $('.js-canvas-control')
                .delegate(
                    '.js-police',
                    'change',
                    function () {
                        var fontFamily = $('input[name=police]:checked').val();
                        var i = $('.js-text-selected').val() - 1;
                        if (i in canvasText) {
                            canvasText[i].fontFamily = fontFamily;
                            canvasText[i]._initDimensions();
                            canvas.renderAll();
                        }
                    }
                );
            $('.js-canvas-control')
                .delegate(
                    '.js-font-size',
                    'change',
                    function () {
                        var fontSize = $(this).val();
                        var i = $('.js-text-selected').val() - 1;
                        if (i in canvasText) {
                            canvasText[i].fontSize = fontSize;
                            canvasText[i]._initDimensions();
                            canvas.renderAll();
                        }
                    }
                );
            setupCanvas();
            deleteText();
            window.canvasText = canvasText;
        };

        return {
            setup: setup
        };
    }
);