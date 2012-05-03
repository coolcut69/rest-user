// Models
window.User = Backbone.Model.extend({
    urlRoot:"../../users",
    defaults:{
        "id":null,
        "email":"",
        "userName":"",
        "firstName":"",
        "lastName":""
    }
});

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
            var self = this;
            app.userList.create(this.model, {
                success:function () {
                    app.navigate('users/' + self.model.id, false);
                }
            });
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
        app.navigate("users/new", true);
        return false;
    }
});


// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "users/new":"newUser",
        "users/:id":"userDetails"
    },

    initialize:function () {
        $('#header').html(new HeaderView().render().el);
    },

    list:function () {
        this.userList = new UserCollection();
        var self = this;
        this.userList.fetch({
            success:function () {
                self.userListView = new UserListView({model:self.userList});
                $('#sidebar').html(self.userListView.render().el);
                if (self.requestedId) self.userDetails(self.requestedId);
            }
        });
    },

    userDetails:function (id) {
        if (this.userList) {
            this.user = this.userList.get(id);
            if (this.userView) this.userView.close();
            this.userView = new UserView({model:this.user});
            $('#content').html(this.userView.render().el);
        } else {
            this.requestedId = id;
            this.list();
        }
    },

    newUser:function () {
        if (app.userView) app.userView.close();
        app.userView = new UserView({model:new User()});
        $('#content').html(app.userView.render().el);
    }

});

var app = new AppRouter();
Backbone.history.start();