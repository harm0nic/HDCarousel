# HDCarousel
Vanilla JS Carousel

A simple and light weight Vanilla JavaScript carousel.


### JS ###
```
const el = document.getElementById("HDCarousel");

const settings = {
  size: 3,
  gap: 22,
  activeClass: true,  
}
new HDCarousel(el, settings);
```

### HTML ###
```
<div id="HDCarousel">
  <div class="hdcarousel_item">1</div>
  <div class="hdcarousel_item">2</div>
  <div class="hdcarousel_item">3</div>
  <div class="hdcarousel_item">4</div>
  <div class="hdcarousel_item">5</div>
</div>
```

### CSS ###
The included CSS is really just for demo purposes. Feel free to style the items as you wish. The only real things to note is that `.hdcarousel` HAS to have `postion: relative` and `.hdcarousel_nav_item` HAS to have `postion: absolute`
