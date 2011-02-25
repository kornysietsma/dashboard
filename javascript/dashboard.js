var Dashboard = {};

/*global _:false, jQuery:false, debug:false */

(function(context, $) {
    context.onStart = function() {
        var that = this;
        this.views = this.loadViews($(".view-template"));
        this.defaultSpace = this.data.spaces[0].name;
        $(window).hashchange(_.bind(this.hashChange,this))
        $("body > header > h1").html(this.data.title);
        $("body > footer > p").html(this.data.footer);
        // spaces are top-level of data, could extract them but why bother?
        this.renderView("#spacenav", "spacenav", this.data);
        // show the home space
        $(window).hashchange();
    };

    context.showSpace = function(spaceName) {
        debug.log("showspace",spaceName);
        var spaceData = _.detect(this.data.spaces, function(space) {return space.name === spaceName});
        if (!spaceData) {
            debug.error("no such space: " + spaceName + " - using default")
            spaceData = this.data.spaces[0]
        }
        this.renderView("#space","space",spaceData);
    }

    context.hashChange = function() {
        var spaceName = location.hash.substring(1);
        debug.log("hashchange",spaceName);
        if (!spaceName) {
            spaceName = this.defaultSpace;
        }
        this.showSpace(spaceName);
    }

    context.loadViews = function(selector) {
        var that = this;
        var views = {};
        selector.each(function() {
            var name = $(this).attr("data-name");
            views[name] = Handlebars.compile($(this).html());
        });
        return views;
    };

    context.renderView = function(element, name, data) {
      if (!this.views[name]) {
        throw new Error("no such view: " + name);
      }
      var viewHtml = this.views[name](data);
      $(element).html(viewHtml);
    };

})(Dashboard, jQuery);

jQuery(function() {
    Dashboard.onStart();
})