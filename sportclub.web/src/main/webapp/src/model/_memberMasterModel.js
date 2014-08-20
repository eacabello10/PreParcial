define([], function() {
    App.Model._MemberMasterModel = Backbone.Model.extend({
		initialize: function() {
            this.on('invalid', function(model,error) {
                Backbone.trigger('member-master-model-error', error);
            });
        },
        validate: function(attrs, options){
        	var modelMaster = new App.Model.MemberModel();
        	if(modelMaster.validate){
            	return modelMaster.validate(attrs.memberEntity,options);
            }
        }
    });

    App.Model._MemberMasterList = Backbone.Collection.extend({
        model: App.Model._MemberMasterModel,
        initialize: function() {
        }

    });
    return App.Model._MemberMasterModel;
    
});