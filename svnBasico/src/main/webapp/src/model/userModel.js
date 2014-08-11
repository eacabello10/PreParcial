/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


App.Model.UserModel = Backbone.Model.extend({
        defaults: {
            'firstName': '',
            'lastName': '',
            'birthDate': ''
        },
        initialize: function() {
 
        }
    });