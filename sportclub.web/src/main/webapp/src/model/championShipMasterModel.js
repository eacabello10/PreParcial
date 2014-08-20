define(['model/_championShipMasterModel'], function() { 
    App.Model.ChampionShipMasterModel = App.Model._ChampionShipMasterModel.extend({

    });

    App.Model.ChampionShipMasterList = App.Model._ChampionShipMasterList.extend({
        model: App.Model.ChampionShipMasterModel
    });

    return  App.Model.ChampionShipMasterModel;

});