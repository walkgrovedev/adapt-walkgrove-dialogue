define([
  'core/js/adapt',
  './dialogueView',
  'core/js/models/itemsComponentModel'
], function(Adapt, DialogueView, ItemsComponentModel) {

  return Adapt.register('dialogue', {
    model: ItemsComponentModel,
    view: DialogueView
  });

});
