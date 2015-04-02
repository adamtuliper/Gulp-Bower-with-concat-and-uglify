# Gulp-Bower-with-concat-and-uglify
Simple demo to concat, uglify, and write the new script name into Index.html
Index.html uses a cool technique by having the following in it:

<!-- inject:js -->
<!-- endinject -->

This will automatically have the script tag injected into it from our gulp script. Cool indeed.

To restore packages:

npm install

bower install

Then you should be good to run grunt at the command line in the root folder, 
at which point in time when it finished you can go check out the /app folder for resulting script and index.html file
