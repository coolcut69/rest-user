// Models
window.User = Backbone.Model.extend();

window.UserCollection = Backbone.Collection.extend({
    model:User,
    url:"../../users"
});

window.UserListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        _.each(this.model.models, function (user) {
            $(this.el).append(new UserListItemView({model:user}).render().el);
        }, this);
        return this;
    }

});


// Views
window.UserListItemView = Backbone.View.extend({

    tagName:"li",

    template:_.template($('#tpl-wine-list-item').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.UserView = Backbone.View.extend({

    template:_.template($('#tpl-wine-details').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "users/:id":"userDetails"
    },

    list:function () {
        this.userList = new UserCollection();
        this.userListView = new UserListView({model:this.userList});
        this.userList.fetch();
        $('#sidebar').html(this.userListView.render().el);
    },

    userDetails:function (id) {
        this.user = this.userList.get(id);
        this.userView = new UserView({model:this.user});
        $('#content').html(this.userView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();
