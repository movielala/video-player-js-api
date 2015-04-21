# Video Player JavaScript API
JavaScript API for MovieLaLa Video Player

## For YouTube IFrame API Users

We have a drop in replacement for users who already have an existing YouTube IFrame API implementation. All you have to do is replace the URL of IFrame API.

Find your original YouTube IFrame API loading code:
```html
<script>
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
</script>
```

Replace the original URL with ours:
```html
<script>
var tag = document.createElement('script');
tag.src = "https://assets-embed.movielala.com/iframe_api"; //Changed
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
</script>
```

### Viewing Your Website with MovieLaLa Video Player

If you want to see what your page will look like after you make the change above, you can install Tempermonkey and the following script on your Chrome to preview changes:
- [Tempermonkey Extension for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
- [MovieLaLa IFrame API Replacer Script for tempermonkey](https://github.com/movielala/video-player-js-api/raw/master/iframe_api-replacer.user.js)
