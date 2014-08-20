define([], function() {
    App.Model._ChampionShipMasterModel = Backbone.Model.extend({
		initialize: function() {
            this.on('invalid', function(model,error) {
                Backbone.trigger('championShip-master-model-error', error);
            });
        },
        validate: function(attrs, options){
        	var modelMaster = new App.Model.ChampionShipModel();
        	if(modelMaster.validate){
            	return modelMaster.validate(attrs.championShipEntity,options);
            }
        }
    });

    App.Model._ChampionShipMasterList = Backbone.Collection.extend({
        model: App.Model._ChampionShipMasterModel,
        initialize: function() {
        }

    });
    return App.Model._ChampionShipMasterModel;
    
});