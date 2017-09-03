# image-zoom
Simple image zoom application built with React.
## Specifications
* it should centre the image in the viewport
* it should initially render the image at the zoom level that fits the image, by width, to the viewport, or 100% of the image if the whole image width fits
* it should allow zooming in and out in 5% increments of the image
* it should zoom in to a maximum of 100% of the image
* it should zoom out to a minimum of 50% of the image
* it should allow selection of any of the 3 sample images provided

## Installing the application
To install the application using npm
```
npm install
```
## Running the application
To run the application locally
```
npm run start
```
## Deploy the application
To deploy the application
```
npm run build
```
The production built hasn't been fully optimized.
## Built with
* [React](https://facebook.github.io/react/) - JavaScript library.
* [Webpack](https://webpack.js.org/) - Module bundler.
* [Alt](http://alt.js.org/) - State manager.
* [Babel](https://babeljs.io/) - JavaScript compiler.
The application is using SASS in conjunction with [CSS Modules](https://github.com/css-modules/css-modules).
ESLint adopting [airbnb](https://www.npmjs.com/package/eslint-config-airbnb)'s config.
CSS lint adopting [stylelint](https://github.com/stylelint/stylelint).
