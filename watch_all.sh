#!/bin/bash
# run precompile apps in the background (though output is in foreground so you can see errors!)
#  you could do this manually in separate terminals if you want more control
#  or kick this off from rake...
sass --watch views/scss:public/stylesheets &
# coffee -o public/javascript --watch views/coffee/ &

