##Issues/Changes to existing code
- The package didn't run by default, it had errors because of a dependency on "xcode command line tools". I had to install it.
- With the latest node LTS, the existing node-sass would not work, updating to latest node-sass worked.
- Added 'copy-webpack-plugin' plugin, so assets can be moved during a build
- Some changes to karma config, so assets can be accessed

##Some comments
- Every line of code is by myself
- I spent quite some hours on this over the weekend, but obviously I don’t consider this ‘production ready’, or even ‘ready for testing’, but rather, good enough for a 'proof of concept'. (sry, also have a son to take care of.. :-p)
- I made it all in vanilla JS/ES6 as requested
- Spent little time on UI/UX, could have added some media queries for “responsive design”, but this seems enough for a POC.
- Created 21 tests, not everything covered of course
- Should be IE9+ compatible, didn’t make it IE8/etc compatible (e.g. addEventListener, calc, etc polyfills). Don’t have my test tools on this laptop to check that.
- Accessibility should be nearly done, did a quick test and nearly everything was working as expected.

##Future changes I would make to this
- Proper store implementation, maybe a flux style one (e.g. store triggers changes to view, etc)
- Proper controller implementation, to handle the events
- Data persisting
- Implement templating system
- Finish/clean the tests
- Game.js needs to be separated in other classes
- UI/UX requires some thinking to make it nice...
- Didn't spend time on performance (e.g. making images efficient, mp3 audio, lazy loading, etc)

##Starting the app
- Install the dependencies: npm install
- Build the bundle: npm run build
- Dev mode: npm run dev
- Production mode: npm run serve
- Run tests: npm run test
