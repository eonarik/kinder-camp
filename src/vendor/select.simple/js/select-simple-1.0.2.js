$.fn.extend({
    'selectSimple': function (params) {
        var df = $.extend({
            'mainClass': 'select-simple',
            'currentClass': 'is-current'
        }, params ? params : {});

        return this.each(function () {
            var t = $(this);
            var select = t.find('select');
            var labeltext = t.find('label:not(.' + df.mainClass + '__btn)').html();
            var id = select.attr('id');
            var isCurrent = false;
            var html = "\
                <div class=\""+ df.mainClass + "\">\
                    <label for=\""+ id + "\" class=\"" + df.mainClass + "__btn\">\
                        <span class=\""+ df.mainClass + "__btn-text\"></span>\
                    </label>\
                    <div class=\""+ df.mainClass + "__list\">\
                        <div class=\""+ df.mainClass + "__list-inner\"></div>\
                    </div>\
                </div>";

            t.append(html);

            var container = t.find('.' + df.mainClass);
            var btn = t.find('.' + df.mainClass + '__btn');

            function openSelect() {
                container.addClass('open');
            }

            function closeSelect() {
                container.removeClass('open');
            }

            select.css({
                "margin": 0,
                "padding": 0,
                "height": 0,
                "border": 0,
                "opacity": 0,
                "position": "absolute",
                "z-index": "-1"
            });

            select.find('option').each(function () {
                var value = $(this).attr('value') || $(this).text();
                var classes = df.mainClass + '__list-item';
                if (!isCurrent && select.val() == value) {
                    classes += ' ' + df.currentClass;
                    t.find('.' + df.mainClass + '__btn-text').html($(this).html());
                    isCurrent = true;
                }
                t
                    .find('.' + df.mainClass + '__list-inner')
                    .append(
                    '<div class="' + classes
                    + '" data-value="'
                    + value
                    + '">'
                    + $(this).html()
                    + '</div>'
                    );
            });

            $(document).click(function (e) {
                if (
                    !t.is(e.target) && t.has(e.target).length === 0
                ) {
                    closeSelect();
                }
            })

            t
                .on('click', '.' + df.mainClass + '__list-item', function (e) {
                    closeSelect();
                    t
                        .find('.' + df.mainClass + '__btn-text')
                        .html($(this).html());
                    t
                        .find('.' + df.mainClass + '__list-item')
                        .removeClass(df.currentClass);

                    $(this).addClass(df.currentClass);
                    select.val($(this).data('value')).change();
                    e.preventDefault();
                    return false;
                })
                .on('click', '.' + df.mainClass + '__btn', function (e) {
                    openSelect();
                    select.focus();
                    e.preventDefault();
                    return false;
                });

            select
                .click(function () {
                    openSelect();
                });

            // t.find('.' + df.mainClass + '__list-item.' + df.currentClass).click();
        });
    }
});