define(['hbs/handlebars', 'i18n'], function ( Handlebars, i18n ) {

    Handlebars.registerHelper('_', function(value) {
        return value && typeof value === 'string' ? i18n._(value) : '';
    });

});
