# gus #

Shorten your Github repo urls with Github's [Git.io](http://git.io) service.


## Features ##

- Pastes the url to your clipboard
- Opens the url in your default browser


## Installation ##

    $ npm install gus


## Usage ##

    var gus = require( 'gus' );

    gus( url );


## Command Line Usage ##

Installing the module locally ([without the `-g` flag](https://npmjs.org/doc/install.html)) requires a little more verbosity:

    $ node path/to/gus [url]

With a global installation:

    $ npm install -g gus

You can use it like any other command:

    $ gus [url]


## Known Issues ##

So far it only works on OSX (uses the `echo` and `pbcopy` unix commands). Support for other platforms coming soon.