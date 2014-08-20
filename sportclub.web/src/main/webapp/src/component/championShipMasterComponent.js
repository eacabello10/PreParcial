define(['controller/selectionController', 'model/cacheModel', 'model/championShipMasterModel', 'component/_CRUDComponent', 'controller/tabController', 'component/championShipComponent',
 'component/prizeComponent'
 ,
 'component/recordComponent'
 ,
 'component/stadiumComponent'
 ,
 'component/refereeComponent'
 ,
 'component/refereeComponent'
 
 ],function(SelectionController, CacheModel, ChampionShipMasterModel, CRUDComponent, TabController, ChampionShipComponent,
 prizeComponent
 ,
 recordsComponent
 ,
 stadiumsComponent
 ,
 refereesComponent
 ,
 secondaryRefereesComponent
 ) {
    App.Component.ChampionShipMasterComponent = App.Component.BasicComponent.extend({
        initialize: function() {
            var self = this;
            this.configuration = App.Utils.loadComponentConfiguration('championShipMaster');
            var uComponent = new ChampionShipComponent();
            uComponent.initialize();
            uComponent.render('main');
            Backbone.on(uComponent.componentId + '-post-championShip-create', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-post-championShip-edit', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-pre-championShip-list', function() {
                self.hideChilds();
            });
            Backbone.on('championShip-master-model-error', function(error) {
                Backbone.trigger(uComponent.componentId + '-' + 'error', {event: 'championShip-master-save', view: self, message: error});
            });
            Backbone.on(uComponent.componentId + '-instead-championShip-save', function(params) {
                self.model.set('championShipEntity', params.model);
                if (params.model) {
                    self.model.set('id', params.model.id);
                } else {
                    self.model.unset('id');
                }
                var prizeModels = self.prizeComponent.componentController.prizeModelList;
                self.model.set('listprize', []);
                self.model.set('createprize', []);
                self.model.set('updateprize', []);
                self.model.set('deleteprize', []);
                for (var i = 0; i < prizeModels.models.length; i++) {
                    var m =prizeModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createprize').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updateprize').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < prizeModels.deletedModels.length; i++) {
                    var m = prizeModels.deletedModels[i];
                    self.model.get('deleteprize').push(m.toJSON());
                }
                var recordsModels = self.recordsComponent.componentController.recordModelList;
                self.model.set('listrecords', []);
                self.model.set('createrecords', []);
                self.model.set('updaterecords', []);
                self.model.set('deleterecords', []);
                for (var i = 0; i < recordsModels.models.length; i++) {
                    var m =recordsModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createrecords').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updaterecords').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < recordsModels.deletedModels.length; i++) {
                    var m = recordsModels.deletedModels[i];
                    self.model.get('deleterecords').push(m.toJSON());
                }
                var stadiumsModels = self.stadiumsComponent.componentController.stadiumModelList;
                self.model.set('liststadiums', []);
                self.model.set('createstadiums', []);
                self.model.set('updatestadiums', []);
                self.model.set('deletestadiums', []);
                for (var i = 0; i < stadiumsModels.models.length; i++) {
                    var m =stadiumsModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createstadiums').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updatestadiums').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < stadiumsModels.deletedModels.length; i++) {
                    var m = stadiumsModels.deletedModels[i];
                    self.model.get('deletestadiums').push(m.toJSON());
                }
                var refereesModels = self.refereesComponent.componentController.refereeModelList;
                self.model.set('listreferees', []);
                self.model.set('createreferees', []);
                self.model.set('updatereferees', []);
                self.model.set('deletereferees', []);
                for (var i = 0; i < refereesModels.models.length; i++) {
                    var m =refereesModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createreferees').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updatereferees').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < refereesModels.deletedModels.length; i++) {
                    var m = refereesModels.deletedModels[i];
                    self.model.get('deletereferees').push(m.toJSON());
                }
                var secondaryRefereesModels = self.secondaryRefereesComponent.componentController.refereeModelList;
                self.model.set('listsecondaryReferees', []);
                self.model.set('createsecondaryReferees', []);
                self.model.set('updatesecondaryReferees', []);
                self.model.set('deletesecondaryReferees', []);
                for (var i = 0; i < secondaryRefereesModels.models.length; i++) {
                    var m =secondaryRefereesModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createsecondaryReferees').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updatesecondaryReferees').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < secondaryRefereesModels.deletedModels.length; i++) {
                    var m = secondaryRefereesModels.deletedModels[i];
                    self.model.get('deletesecondaryReferees').push(m.toJSON());
                }
                self.model.save({}, {
                    success: function() {
                        Backbone.trigger(uComponent.componentId + '-post-championShip-save', self);
                    },
                    error: function(error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'championShip-master-save', view: self, error: error});
                    }
                });
            });
        },
        renderChilds: function(params) {
            var self = this;
            this.tabModel = new App.Model.TabModel(
                    {
                        tabs: [
                            {label: "Prize", name: "prize", enable: true},
                            ,
                            {label: "Records", name: "records", enable: true},
                            ,
                            {label: "Stadiums", name: "stadiums", enable: true},
                            ,
                            {label: "Referees", name: "referees", enable: true},
                            ,
                            {label: "Secondary Referees", name: "secondaryReferees", enable: true},
                        ]
                    }
            );

            this.tabs = new TabController({model: this.tabModel});

            this.tabs.render('tabs');
            App.Model.ChampionShipMasterModel.prototype.urlRoot = this.configuration.context;
            var options = {
                success: function() {
					self.prizeComponent = new prizeComponent();
                    self.prizeModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.PrizeModel), self.model.get('listprize'));
                    self.prizeComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.PrizeModel),
                        listModelClass: App.Utils.createCacheList(App.Model.PrizeModel, App.Model.PrizeList, self.prizeModels)
                    });
                    self.prizeComponent.render(self.tabs.getTabHtmlId('prize'));
                    Backbone.on(self.prizeComponent.componentId + '-post-prize-create', function(params) {
                        params.view.currentPrizeModel.setCacheList(params.view.prizeModelList);
                    });
					self.recordsComponent = new recordsComponent();
                    self.recordsModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.RecordModel), self.model.get('listrecords'));
                    self.recordsComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.RecordModel),
                        listModelClass: App.Utils.createCacheList(App.Model.RecordModel, App.Model.RecordList, self.recordsModels)
                    });
                    self.recordsComponent.render(self.tabs.getTabHtmlId('records'));
                    Backbone.on(self.recordsComponent.componentId + '-post-record-create', function(params) {
                        params.view.currentRecordModel.setCacheList(params.view.recordModelList);
                    });
					self.stadiumsComponent = new stadiumsComponent();
                    self.stadiumsModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.StadiumModel), self.model.get('liststadiums'));
                    self.stadiumsComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.StadiumModel),
                        listModelClass: App.Utils.createCacheList(App.Model.StadiumModel, App.Model.StadiumList, self.stadiumsModels)
                    });
                    self.stadiumsComponent.render(self.tabs.getTabHtmlId('stadiums'));
                    Backbone.on(self.stadiumsComponent.componentId + '-post-stadium-create', function(params) {
                        params.view.currentStadiumModel.setCacheList(params.view.stadiumModelList);
                    });
					self.refereesComponent = new refereesComponent();
                    self.refereesModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.RefereeModel), self.model.get('listreferees'));
                    self.refereesComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.RefereeModel),
                        listModelClass: App.Utils.createCacheList(App.Model.RefereeModel, App.Model.RefereeList, self.refereesModels)
                    });
                    self.refereesComponent.render(self.tabs.getTabHtmlId('referees'));
                    Backbone.on(self.refereesComponent.componentId + '-post-referee-create', function(params) {
                        params.view.currentRefereeModel.setCacheList(params.view.refereeModelList);
                    });
					self.secondaryRefereesComponent = new secondaryRefereesComponent();
                    self.secondaryRefereesModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.RefereeModel), self.model.get('listsecondaryReferees'));
                    self.secondaryRefereesComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.RefereeModel),
                        listModelClass: App.Utils.createCacheList(App.Model.RefereeModel, App.Model.RefereeList, self.secondaryRefereesModels)
                    });
                    self.secondaryRefereesComponent.render(self.tabs.getTabHtmlId('secondaryReferees'));
                    Backbone.on(self.secondaryRefereesComponent.componentId + '-post-referee-create', function(params) {
                        params.view.currentRefereeModel.setCacheList(params.view.refereeModelList);
                    });
                    self.prizeToolbarModel = self.prizeComponent.toolbarModel.set(App.Utils.Constans.referenceToolbarConfiguration);
                    self.prizeComponent.setToolbarModel(self.prizeToolbarModel);                    
                    self.recordsToolbarModel = self.recordsComponent.toolbarModel.set(App.Utils.Constans.referenceToolbarConfiguration);
                    self.recordsComponent.setToolbarModel(self.recordsToolbarModel);                    
                    self.stadiumsToolbarModel = self.stadiumsComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.stadiumsComponent.setToolbarModel(self.stadiumsToolbarModel);
                    self.refereesToolbarModel = self.refereesComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.refereesComponent.setToolbarModel(self.refereesToolbarModel);
                    self.secondaryRefereesToolbarModel = self.secondaryRefereesComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.secondaryRefereesComponent.setToolbarModel(self.secondaryRefereesToolbarModel);
                	
                     
                
                    Backbone.on(self.stadiumsComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController({"componentId":"stadiumsComponent"});
                        App.Utils.getComponentList('stadiumComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no Stadiumss to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'Stadiums List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('stadiumsComponent-post-selection', function(models) {
                        var cachestadiumsModel = App.Utils.createCacheModel(App.Model.StadiumModel);
                        models = App.Utils.convertToModel(cachestadiumsModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.stadiumsComponent.componentController.stadiumModelList);
                        	model.save('',{});
                        }
                        self.stadiumsComponent.componentController.showEdit=false;
                        self.stadiumsComponent.componentController.list();
                        
                    });
                    Backbone.on(self.refereesComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController({"componentId":"refereesComponent"});
                        App.Utils.getComponentList('refereeComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no Refereess to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'Referees List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('refereesComponent-post-selection', function(models) {
                        var cacherefereesModel = App.Utils.createCacheModel(App.Model.RefereeModel);
                        models = App.Utils.convertToModel(cacherefereesModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.refereesComponent.componentController.refereeModelList);
                        	model.save('',{});
                        }
                        self.refereesComponent.componentController.showEdit=false;
                        self.refereesComponent.componentController.list();
                        
                    });
                    Backbone.on(self.secondaryRefereesComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController({"componentId":"secondaryRefereesComponent"});
                        App.Utils.getComponentList('refereeComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no Secondary Refereess to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'Secondary Referees List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('secondaryRefereesComponent-post-selection', function(models) {
                        var cachesecondaryRefereesModel = App.Utils.createCacheModel(App.Model.RefereeModel);
                        models = App.Utils.convertToModel(cachesecondaryRefereesModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.secondaryRefereesComponent.componentController.refereeModelList);
                        	model.save('',{});
                        }
                        self.secondaryRefereesComponent.componentController.showEdit=false;
                        self.secondaryRefereesComponent.componentController.list();
                        
                    });
                    $('#tabs').show();
                },
                error: function() {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'championShip-edit', view: self, id: id, data: data, error: error});
                }
            };
            if (params.id) {
                self.model = new App.Model.ChampionShipMasterModel({id: params.id});
                self.model.fetch(options);
            } else {
                self.model = new App.Model.ChampionShipMasterModel();
                options.success();
            }


        },
        hideChilds: function() {
            $('#tabs').hide();
        },
            
            postInit: function(){              
                this.toolbarModel.set('showPrint', false);
                this.toolbarModel.set('showSearch', false);
            }
    });

    return App.Component.ChampionShipMasterComponent;
});