# Korny's Dashboard
This is a very simple html dashboard, for managing my local bookmarks.  It's all html/css/javascript, so can be hosted
very simply - in fact you can host it trivially just by copying the whole "public" directory to DropBox.

Note this will only work reliably on a modern browser - it might be OK on ie7, but really it's been tested on Chrome,
Safari and Firefox, and nowhere else.

See a working sample dashboard at: [http://kornysietsma.github.com/dashboard/]

Goals:

* simple - to deploy, to edit, to understand
* fast - I could use something like the Google Desktop if I wanted lots of bells and whistles; I just want a clean set of my regularly used bookmarks
* clear - Every browser has it's own bookmarks, but they are a tiny bar at the top of the page. I want a nice visible set of pages so it's easy on the eyes, and the brain

## Hosting
* Copy everything in the "public" directory to a web host, or even just a local file system.
* Open "public/dashboard.html" in a web browser.
* Enjoy!

## Editing tags
All tag data is in the file public/javascript/dashboard_data.js.  There is no server.  To edit the tags, edit the data file.

One day there might be a server to host this data via a JSON api, and a UI to edit it, but so far editing json by hand has been good enough for me, and a lot less work!

## Building the css
There is almost no "build" step in this site - but if you want to change any css, you'll need to buld the css from the base .scss files:

* install ruby - any version should do
* install Sass - see the [Sass](http://sass-lang.com) site for more, or if you have ruby and rubygems set up, "gem install haml" should do it.
* edit the scss files in views/scss
* run "./precompile.sh" to build the public/stylesheets/dashboard.css file
* or run "./watch_all.sh" which will run a background task that automatically rebuilds the css from the scss source whenever a file changes.

The dashboard.css file is checked in as a convenience - you shouldn't ever edit it directly!

## Other notes
This has grown over the years from a range of original html/css files on my local machine.
I got the original concept from a friend's project somewhere on github - but I have no idea who that was now. sorry.
I'm happy to give credit if someone can remind me where I met the first dashboard!

see separate TODO.md file for future plans.

Much of this was bootstrapped from code in my [Loosely Coupled Web App Skeleton](http://github.com/kornysietsma/lcwa_skeleton) code.
