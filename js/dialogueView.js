define([
  'core/js/adapt',
  'core/js/views/componentView'
], function(Adapt, ComponentView, MODE) {
  'use strict';

  var DialogueView = ComponentView.extend({

    _isInitial: true,

    events: {
      'click .js-dialogue-start-click': 'onStartClicked'
    },

    preRender: function() {
      var objCharacter = {},
      arrCharacters = [],
      inArray = function( mxdNeedle, arrHaystack ) {
          for( var mxdValue in arrHaystack ) {
              if( arrHaystack[mxdValue] === mxdNeedle ) {
                  return true;
              }
          }

          return false;
      };

      for( var intCharacter in this.model.get( '_characters' ) ) {
          objCharacter[this.model.get( '_characters' )[intCharacter]] = this.model.get( '_characters' )[intCharacter];
          arrCharacters.push(objCharacter[this.model.get( '_characters' )[intCharacter]]);
      }

      Handlebars.registerHelper( 'characterName',
          function( strCharacter ) {
              return arrCharacters[strCharacter].name || '';
          }
      );

      Handlebars.registerHelper( 'characterImage',
          function( strCharacter ) {
            return arrCharacters[strCharacter]._image || '';
          }
      );

      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      this.setReadyStatus();
      this.setupInview();
    },

    onStartClicked: function() {
      this.$('.dialogue__main').addClass('is-visible');
      this.$('.dialogue__button').removeClass('is-visible');
      this.$('.dialogue__instruction-inner').addClass('is-invisible');

      this.setupInview();
    },

    setupInview: function() {
      var selector = this.getInviewElementSelector();
      if (!selector) {
        this.setCompletionStatus();
        return;
      }
      this.setupInviewCompletion(selector);
    },

    /**
     * determines which element should be used for inview logic - body, instruction or title - and returns the selector for that element
     */
    getInviewElementSelector: function() {
      return '.dialogue__complete';
    },


    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }

    

  });

  return DialogueView;

});
