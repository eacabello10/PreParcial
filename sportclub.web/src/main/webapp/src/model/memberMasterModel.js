define(['model/_memberMasterModel'], function() { 
    App.Model.MemberMasterModel = App.Model._MemberMasterModel.extend({

    });

    App.Model.MemberMasterList = App.Model._MemberMasterList.extend({
        model: App.Model.MemberMasterModel
    });

    return  App.Model.MemberMasterModel;

});