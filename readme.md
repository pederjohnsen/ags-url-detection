# <!--<img width="438" align="right" src="https://user-images.githubusercontent.com/1402241/81425503-01b4d800-9158-11ea-9406-484a1ff37968.png">--> ags-url-detection

> Which AGS website page are you on? Is it a game? Is it a wiki entry? Perfect for your WebExtension or userscript.

## Install

```sh
npm install ags-url-detection
```

```js
import * as pageDetect from 'ags-url-detection';
```

```js
const pageDetect = require('ags-url-detection');
```

## Usage

```js
const href = 'https://www.adventuregamestudio.co.uk/site/games/game/2492-duty-first/';
if (pageDetect.isGame(new URL(href))) { // Pass the URL as an `URL` object
	alert('The passed URL is of a game!')
}

if (pageDetect.isWikiEntry()) { // Uses `window.location.href` by default
	alert('You’re looking at a wiki entry!')
}
```

## API

In the source you can see the [full list of detections](https://www.unpkg.com/browse/ags-url-detection@latest/esm/index.d.ts) and [their matching URLs.](https://github.com/pederjohnsen/ags-url-detection/blob/master/index.ts)

Most detections are URL-based while others need access to the current `document`. You can determine which ones are URL-based by looking at their signature: URL-based functions have a `url` parameter.

### URL-based detections

By default, URL-based detections use the `location` global if you don't pass a `url` argument.

```js
if (pageDetect.isGame()) {
	alert('You’re looking at a game!')
}
```

```js
if (pageDetect.isGame(new URL('https://www.adventuregamestudio.co.uk/site/games/game/2492-duty-first/'))) {
	alert('You’re looking at a game!')
}
```

Notice that the `url` parameter is not a plain string but it has to be a proper `URL` or `location` object.

<!-- TODO: Add if there are document based detections added
### Document-based detections

By default, `document`-based detections use the `document` global, which means they can only be used if you have the whole page, you can't just test any random URL string.


```js
if (pageDetect.isDocumentBasedDetection()) {
	alert('You’re on an document based detection, like https://www.adventuregamestudio.co.uk/doucmentBasedDetection')
}
```
-->

## License

MIT © [Peder Johnsen](https://pederjohnsen.com)
