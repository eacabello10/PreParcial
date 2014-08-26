/* ========================================================================
 * Copyright 2014 GrupoPreParcial
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 GrupoPreParcial

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['model/profesorModel'], function(profesorModel) {
    App.Controller._ProfesorController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#profesor').html());
            this.listTemplate = _.template($('#profesorList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-profesor-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-profesor-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-profesor-create', {view: this});
                this.currentProfesorModel = new this.modelClass({componentId: this.componentId});
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-profesor-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-profesor-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-profesor-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-profesor-list', {view: this, data: data});
                var self = this;
				if(!this.profesorModelList){
                 this.profesorModelList = new this.listModelClass();
				}
                this.profesorModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-profesor-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'profesor-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-profesor-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-profesor-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-profesor-edit', {view: this, id: id, data: data});
                if (this.profesorModelList) {
                    this.currentProfesorModel = this.profesorModelList.get(id);
                    this.currentProfesorModel.set('componentId',this.componentId); 
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-profesor-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentProfesorModel = new this.modelClass({id: id});
                    this.currentProfesorModel.fetch({
                        data: data,
                        success: function() {
                            self.currentProfesorModel.set('componentId',self.componentId); 
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-profesor-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'profesor-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-profesor-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-profesor-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-profesor-delete', {view: this, id: id});
                var deleteModel;
                if (this.profesorModelList) {
                    deleteModel = this.profesorModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-profesor-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'profesor-delete', view: self, error: error});
                    }
                });
            }
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-profesorForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-profesor-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-profesor-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-profesor-save', {view: this, model : model});
                this.currentProfesorModel.set(model);
                this.currentProfesorModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-profesor-save', {model: self.currentProfesorModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'profesor-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({profesors: self.profesorModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({profesor: self.currentProfesorModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._ProfesorController;
});