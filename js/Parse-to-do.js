;
(function(exports) {

    "use strict";

    Parse.TasksRouter = Parse.Router.extend({
        initialize: function() {
            // collection and view
            this.collection = new Parse.TasksList(testData);
            this.view = new Parse.TasksView({
                collection: this.collection
            });
            Parse.history.start();
        },
        routes: {
            "item/:id": "details",
            "*default": "home"

        },
        home: function() {
            this.view.render();
            // this.collection.models[0].view.el.innerHTML = '';
        },
         details: function(id) {
        var deets = this.collection.models.filter(function(val) {
    return val.get('tasks') === id
})[0]
        deets.view.render();
        this.view.el.innerHTML = '';
        }
    })

    Parse.Tasks = Parse.Object.extend({
        className: "info",
        initialize: function() {
            this.view = new Parse.ItemView({
                model: this
            })
        }
    })

    Parse.ItemView = Parse.TemplateView.extend({
        el: ".description",
        view: "details",
    })

    Parse.TasksView = Parse.TemplateView.extend({
        el: ".container",
        view: "do-it",
         events: {
            "submit .task-form": "addTask",
            // "change input [type=checkbox]" :"isDone"
        },

         addTask: function(e){
            e.preventDefault();
            var theTask = {
                tasks: this.el.querySelector("input[name='taskname']").value
            }
            this.collection.add(theTask, {validate: true});
        }

    })

    Parse.TasksList = Parse.Collection.extend({
        model: Parse.Tasks
    })

    var testData = [{
        tasks: "Run 2k"
    }, {
        tasks: "Eat"
    }, {
        tasks: "Shower"
    }, {
        tasks: "Code"

    }]


})(typeof module === "object" ? module.exports : window)
