// Models
window.User = Backbone.Model.extend({
    url:"../../users",
    defaults:{
        "id":null,
        "email":"",
        "userName":"",
        "firstName":"",
        "lastName":""
    }
});

//tom zanger
//wim cabaretier
//stijn ontwerper

window.UserCollection = Backbone.Collection.extend({
    model:User,
    url:"../../users"
});


// Views
window.UserListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (user) {
            $(self.el).append(new UserListItemView({model:user}).render().el);
        });
    },

    render:function (eventName) {
        _.each(this.model.models, function (user) {
            $(this.el).append(new UserListItemView({model:user}).render().el);
        }, this);
        return this;
    }
});

window.UserListItemView = Backbone.View.extend({

    tagName:"li",

    template:_.template($('#tpl-user-list-item').html()),

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
});

window.UserView = Backbone.View.extend({

    template:_.template($('#tpl-user-details').html()),

    initialize:function () {
        this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events:{
        "change input":"change",
        "click .save":"saveUser",
        "click .delete":"deleteUser"
    },

    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
        // You could change your model on the spot, like this:
        // var change = {};
        // change[target.name] = target.value;
        // this.model.set(change);
    },

    saveUser:function () {
        this.model.set({
            email:$('#email').val(),
            userName:$('#userName').val(),
            lastName:$('#lastName').val(),
            firstName:$('#firstName').val()
        });
        if (this.model.isNew()) {
            app.userList.create(this.model);
        } else {
            this.model.save();
        }
        return false;
    },

    deleteUser:function () {
        this.model.destroy({
            success:function () {
                alert('User deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }
});

window.HeaderView = Backbone.View.extend({

    template:_.template($('#tpl-header').html()),

    initialize:function () {
        this.render();
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    events:{
        "click .new":"newUser"
    },

    newUser:function (event) {
        if (app.userView) app.userView.close();
        app.userView = new UserView({model:new User()});
        $('#content').html(app.userView.render().el);
        return false;
    }
});


// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "users/:id":"userDetails"
    },

    initialize:function () {
        $('#header').html(new HeaderView().render().el);
    },

    list:function () {
        this.userList = new UserCollection();
        this.userListView = new UserListView({model:this.userList});
        this.userList.fetch();
        $('#sidebar').html(this.userListView.render().el);
    },

    userDetails:function (id) {
        this.user = this.userList.get(id);
        if (app.userView) app.userView.close();
        this.userView = new UserView({model:this.user});
        $('#content').html(this.userView.render().el);
    }

});

var app = new AppRouter();
Backbone.history.start();