# gistio-clone
This is a github [gist](https://gist.github.com/) viewer which was inspired by
[gist.io](http://gist.io). I made it because although I like gist.io, the source
is in python and it does not handle multiple files the way I expected it to.
Check out gist.io and also checkout [bl.ocks.org](http://bl.ocks.org/) which
inspired it.

## Usage
There are two ways to use gistio-clone, you can either run it locally or you may
use a free version, hosted on [heroku](https://www.heroku.com/).

### Hosted
Visit [http://gistio-clone.herokuapp.com/](http://gistio-clone.herokuapp.com/).
There are some sample gists on the home page.
To view your own gists, simply append your gist ID to the URL.

### Run Locally
Node is required to run this program locally. If you don't have it installed,
install it from [here](http://nodejs.org/download/).

 1. clone this repo
 2. install dependencies by running `npm install`
 3. run the app with `node app.js`
 4. go to [localhost:3000/9454341](http://localhost:3000/9454341) in a browser.
 5. Replace the example gistid in the URL with one of your own.
 6. profit

Test with these public gists
 * [9454341](http://gistio-clone.herokuapp.com/9454341)
 * [7885923](http://gistio-clone.herokuapp.com/7885923)
 * [10685710](http://gistio-clone.herokuapp.com/10685710)

Test with this secret gist. The proto-gist!!
* [Click me](http://gistio-clone.herokuapp.com/1)

## TO-DO
 * Design
 * Syntax Highlighting
  * Currently only JS highlighting is supported thanks to [prismjs](http://prismjs.com/).
  Pulling in all the supported languages from prismjs would be heavy, so I would
  like a better solution.
