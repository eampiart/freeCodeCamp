# README

## Run on Codepen
When importing to CodePen, include jQuery & Angular in the pen and use the files from the *lib* folder.

## Run locally
`npm install && bower install`

**To build**, `gulp build`

**To serve with browser-sync** for development, `gulp serve-dev`  
(Will watch for file changes)

**To simply serve**, `gulp serve`  
(Spawns a simple webserver on [http://localhost:3000](http://localhost:3000))

**To test**, `gulp test`  
(Spawns a webserver, starts webdriver, sets params.url (to be used in the spec file) to the webserver url, stops server & webdriver)