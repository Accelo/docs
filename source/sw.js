/*global toolbox importScripts:true*/

importScripts('sw-toolbox.js');

// enable when testing add additional debug code
// toolbox.options.debug = true;

toolbox.precache([
	'https://fonts.googleapis.com/css?family=Roboto',
]);
toolbox.router.get('/(.*)', toolbox.fastest);
