define(['controller/selectionController', 'model/cacheModel', 'model/memberMasterModel', 'component/_CRUDComponent', 'controller/tabController', 'component/memberComponent',
 'component/addressComponent'
 ,
 'component/memberComponent'
 ,
 'component/sportComponent'
 
 ],function(SelectionController, CacheModel, MemberMasterModel, CRUDComponent, TabController, MemberComponent,
 addressesComponent
 ,
 relativesComponent
 ,
 sportsComponent
 ) {
    App.Component.MemberMasterComponent = App.Component.BasicComponent.extend({
        initialize: function() {
            var self = this;
            this.configuration = App.Utils.loadComponentConfiguration('memberMaster');
            var uComponent = new MemberComponent();
            uComponent.initialize();
            uComponent.render('main');
            Backbone.on(uComponent.componentId + '-post-member-create', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-post-member-edit', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-pre-member-list', function() {
                self.hideChilds();
            });
            Backbone.on('member-master-model-error', function(error) {
                Backbone.trigger(uComponent.componentId + '-' + 'error', {event: 'member-master-save', view: self, message: error});
            });
            Backbone.on(uComponent.componentId + '-instead-member-save', function(params) {
                self.model.set('memberEntity', params.model);
                if (params.model) {
                    self.model.set('id', params.model.id);
                } else {
                    self.model.unset('id');
                }
                var addressesModels = self.addressesComponent.componentController.addressModelList;
                self.model.set('listaddresses', []);
                self.model.set('createaddresses', []);
                self.model.set('updateaddresses', []);
                self.model.set('deleteaddresses', []);
                for (var i = 0; i < addressesModels.models.length; i++) {
                    var m =addressesModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createaddresses').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updateaddresses').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < addressesModels.deletedModels.length; i++) {
                    var m = addressesModels.deletedModels[i];
                    self.model.get('deleteaddresses').push(m.toJSON());
                }
                var relativesModels = self.relativesComponent.componentController.memberModelList;
                self.model.set('listrelatives', []);
                self.model.set('createrelatives', []);
                self.model.set('updaterelatives', []);
                self.model.set('deleterelatives', []);
                for (var i = 0; i < relativesModels.models.length; i++) {
                    var m =relativesModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createrelatives').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updaterelatives').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < relativesModels.deletedModels.length; i++) {
                    var m = relativesModels.deletedModels[i];
                    self.model.get('deleterelatives').push(m.toJSON());
                }
                var sportsModels = self.sportsComponent.componentController.sportModelList;
                self.model.set('listsports', []);
                self.model.set('createsports', []);
                self.model.set('updatesports', []);
                self.model.set('deletesports', []);
                for (var i = 0; i < sportsModels.models.length; i++) {
                    var m =sportsModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createsports').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updatesports').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < sportsModels.deletedModels.length; i++) {
                    var m = sportsModels.deletedModels[i];
                    self.model.get('deletesports').push(m.toJSON());
                }
                self.model.save({}, {
                    success: function() {
                        Backbone.trigger(uComponent.componentId + '-post-member-save', self);
                    },
                    error: function(error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'member-master-save', view: self, error: error});
                    }
                });
            });
        },
        renderChilds: function(params) {
            var self = this;
            this.tabModel = new App.Model.TabModel(
                    {
                        tabs: [
                            {label: "Addresses", name: "addresses", enable: true},
                            ,
                            {label: "Relatives", name: "relatives", enable: true},
                            ,
                            {label: "Sports", name: "sports", enable: true},
                        ]
                    }
            );

            this.tabs = new TabController({model: this.tabModel});

            this.tabs.render('tabs');
            App.Model.MemberMasterModel.prototype.urlRoot = this.configuration.context;
            var options = {
                success: function() {
					self.addressesComponent = new addressesComponent();
                    self.addressesModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.AddressModel), self.model.get('listaddresses'));
                    self.addressesComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.AddressModel),
                        listModelClass: App.Utils.createCacheList(App.Model.AddressModel, App.Model.AddressList, self.addressesModels)
                    });
                    self.addressesComponent.render(self.tabs.getTabHtmlId('addresses'));
                    Backbone.on(self.addressesComponent.componentId + '-post-address-create', function(params) {
                        params.view.currentAddressModel.setCacheList(params.view.addressModelList);
                    });
					self.relativesComponent = new relativesComponent();
                    self.relativesModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.MemberModel), self.model.get('listrelatives'));
                    self.relativesComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.MemberModel),
                        listModelClass: App.Utils.createCacheList(App.Model.MemberModel, App.Model.MemberList, self.relativesModels)
                    });
                    self.relativesComponent.render(self.tabs.getTabHtmlId('relatives'));
                    Backbone.on(self.relativesComponent.componentId + '-post-member-create', function(params) {
                        params.view.currentMemberModel.setCacheList(params.view.memberModelList);
                    });
					self.sportsComponent = new sportsComponent();
                    self.sportsModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.SportModel), self.model.get('listsports'));
                    self.sportsComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.SportModel),
                        listModelClass: App.Utils.createCacheList(App.Model.SportModel, App.Model.SportList, self.sportsModels)
                    });
                    self.sportsComponent.render(self.tabs.getTabHtmlId('sports'));
                    Backbone.on(self.sportsComponent.componentId + '-post-sport-create', function(params) {
                        params.view.currentSportModel.setCacheList(params.view.sportModelList);
                    });
                    self.addressesToolbarModel = self.addressesComponent.toolbarModel.set(App.Utils.Constans.referenceToolbarConfiguration);
                    self.addressesComponent.setToolbarModel(self.addressesToolbarModel);                    
                    self.relativesToolbarModel = self.relativesComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.relativesComponent.setToolbarModel(self.relativesToolbarModel);
                    self.sportsToolbarModel = self.sportsComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.sportsComponent.setToolbarModel(self.sportsToolbarModel);
                	
                     
                
                    Backbone.on(self.relativesComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController({"componentId":"relativesComponent"});
                        App.Utils.getComponentList('memberComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no Relativess to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'Relatives List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('relativesComponent-post-selection', function(models) {
                        var cacherelativesModel = App.Utils.createCacheModel(App.Model.MemberModel);
                        models = App.Utils.convertToModel(cacherelativesModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.relativesComponent.componentController.memberModelList);
                        	model.save('',{});
                        }
                        self.relativesComponent.componentController.showEdit=false;
                        self.relativesComponent.componentController.list();
                        
                    });
                    Backbone.on(self.sportsComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController({"componentId":"sportsComponent"});
                        App.Utils.getComponentList('sportComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no Sportss to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'Sports List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('sportsComponent-post-selection', function(models) {
                        var cachesportsModel = App.Utils.createCacheModel(App.Model.SportModel);
                        models = App.Utils.convertToModel(cachesportsModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.sportsComponent.componentController.sportModelList);
                        	model.save('',{});
                        }
                        self.sportsComponent.componentController.showEdit=false;
                        self.sportsComponent.componentController.list();
                        
                    });
                    $('#tabs').show();
                },
                error: function() {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'member-edit', view: self, id: id, data: data, error: error});
                },
            
            postInit: function(){              
                this.toolbarModel.set('showPrint', false);
                this.toolbarModel.set('showSearch', false);
            }
            };
            if (params.id) {
                self.model = new App.Model.MemberMasterModel({id: params.id});
                self.model.fetch(options);
            } else {
                self.model = new App.Model.MemberMasterModel();
                options.success();
            }


        },
        hideChilds: function() {
            $('#tabs').hide();
        }
    });

    return App.Component.MemberMasterComponent;
});