define([
  'marionette',
  'handlebars',

  'text!templates/landingpage/landingPage.hbs'
  ], function (Marionette, Handlebars, tpl) {

    LandingPageView = Backbone.Marionette.ItemView.extend({
      template: Handlebars.compile(tpl),

      ui : {},

      events : {}

    });

    return LandingPageView;
});

