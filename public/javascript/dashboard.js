var Dashboard = {};

/*global _:false, jQuery:false, debug:false */

(function(context, $) {
    context.onStart = function() {
        var that = this;
        this.mobile = this.isMobile();
        this.views = this.loadViews($(".view-template"));
        this.defaultSpace = this.data.spaces[0].name;
        $(window).hashchange(_.bind(this.hashChange,this))
        $("body > header > h1").html(this.data.title);
        $("body > footer > p").html(this.data.footer);
        // spaces are top-level of data, could extract them but why bother?
        this.renderView("#spacenav", "spacenav", this.data);
        // show the home space
        $(window).hashchange();
        $(window).resize(_.bind(this.onResize,this))
    };

    context.isMobile = function() {
        return $(window).width() < 600;   // Must match CSS rules for sanity!
    }

    context.onResize = function() {
        var oldMobile = this.mobile;
        this.mobile = this.isMobile();
        if (this.mobile != oldMobile) {
            this.hashChange();
        }
    }

    context.showSpace = function(spaceName) {
        debug.log("showspace",spaceName);
        var spaceData = this.filterMobile(_.detect(this.data.spaces, function(space) {return space.name === spaceName}));
        if (!spaceData) {
            debug.error("no such space: " + spaceName + " - using default")
            spaceData = this.data.spaces[0]
        }
        this.renderView("#space","space",spaceData);
    }

    context.filterMobile = function(spaceData) {
        var that = this;
        var filtered = { name: spaceData.name };
        filtered.groups = _.map(spaceData.groups, function(group) {
            return that.filterMobileGroup(group);
        });
        filtered.groups = _.reject(filtered.groups, function(group) {
            return group.tags.length == 0;
        })
        return filtered;
    }

    context.filterMobileGroup = function(group) {
        var that = this;
        var filtered = { name: group.name };
        var mobile = this.mobile;
        filtered.tags = _.map(group.tags, function(tag) {
            if (mobile) {
                if (!!tag.d_only) {
                    return {skip:true};
                }
                var newTag = {title: tag.title, url: tag.url};
                if (tag.m_url != null) {
                    newTag.url = tag.m_url
                }
                if (tag.m_title != null) {
                    newTag.title = tag.m_title;
                }
                return newTag;
            } else { // desktop
                if (!!tag.m_only) {
                    return {skip:true};
                }
                return tag;  // has some wasted extra bits, but faster to just send it all
            }
        });
        filtered.tags = _.reject(filtered.tags, function(tag) {
            return tag.skip;
        });
        return filtered;
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