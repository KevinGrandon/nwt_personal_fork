<h1>NWTui</h1>

NWTui is a modern approach at a javascript framework. NWTui combines the best practices of leading JS frameworks, along with some personal touches that make for an extremely familiar environment which you will be able to develop rapidly in.

<h2>Usage</h2>

Include the script. We recommend namespacing window.nwt to window.n for easier access.

```html
<script type="text/javascript" src="nwt.main.min.js"></script>
<script type="text/javascript">window.n = window.nwt;</script>
```

<h2>Node Methods (DOM methods)</h2>

Accessing dom elements is easy and can be done with n.one() or n.all() for a collection.

```js
var el = n.one('#someid .someclass');
el.setContent('Hello Nodo');

// Alerts 'Hello Nodo'
alert(el.getContent());
```

A few useful methods

```js
// Accesses the parent node
el.parent();

// Access an ancestor node by selector
el.ancestor('.someclass');

// Gets the previous node
el.previous();

// Gets the next node
el.next();

// Returns a single element that is a child of this node based on selector
el.one('#selector');

// Returns a collection of elements based on selector
el.all('.selector');

// Checks if the el has a class
el.hasClass('someclass');

// Adds a class
el.addClass('someclass');

// Removes a class
el.removeClass('someclass');

// Swaps a class
el.swapClass('oldclass', 'newclass');

// Sets a style
el.setStyle('top', 0);

// Removes a style
el.removeStyle('top')

// Sets several styles
el.setStyles({top:0, left:0});

// Removes several styles
el.removeStyles(['top', 'left']);

// Gets the value of a style
el.getStyle('top')
```

Creating new node instances is easy using n.node.create().

```js
var el = n.node.create('<div class="boringexample">Some HTML</div>');
alert(el.hasClass('boringexample')); // Alerts true

// Appending nodes
n.one('body').append(el);

// Can also use insert (before or after)
n.one('.container').insert(el, 'before');
n.one('.container').insert(el, 'after');
```


<h2>Node Collections</h2>

Node Collections are useful when dealing with multiple nodes at once.

```js
// Creating a new collection
var els = n.all('#mymenu li');

// Iterate over each item in the collection
// Receives each element as an argument
els.each(function(el){
  console.log(el);
});


// Chaining from a single node is useful if you already have a node object
var mynode = n.one('#mymenu');
mynode.all('li').removeClass('active'); // Removes the 'active' class from all nodes in this collection
```


<h2>IO (ajax)</h2>

Using n.io it's easy to create ajax calls.

```js
// Get an io object with n.io
var req = n.io('/backend');

// Setup any handlers
req.success(fn);

// Send the request
req.post();


// Or chain everything together:
var req = n.io('/backend').success(fn).post();

// Abort if you want
req.abort();

// It's possible to make RESTFUL requests
n.io('/backend?key=val').get();
n.io('/backend').put();
n.io('/backend').post();
n.io('/backend').delete();

// The put, delete, and post methods can take data to send to the backend
// This data can come in the form of a string or node to serialize
n.io('/backend').post('mypet=cat&name=snickers');
n.io('/backend').post(n.one('form#theform'));
```

IO callbacks receive a specially wrapped IO object. You can either use this object as a JSON response via the o.obj property, or static text. The original request object is available in the request key of the object.

```js
// The server here responds with the following JSON: {"foo": "bar"}
n.io('/test').success(function(o) {

	// Alerts the string: {"foo": "bar"}
	alert(o); 

	// Alerts the string: bar
	alert(o.obj.foo);
}).post();


// The server here responds with: <span>Hello NWTui</span>
n.io('/test').success(function(o) {

	// Sets the content of an element to the response text
	n.one('#myid').setContent(o);

	// In this case o.obj is undefined because we are not able to parse the JSON
}).post();

```


<h2>Anim (animation)</h2>

The anim utility provides a wrapper for easy CSS3 transitions. 

```js
// Animate #cat for 2 seconds
n.one('#cat').anim({top:100, left:100}, 2);


// The following easing functions are available:
// linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
n.one('#cat').anim({top:100, left:100}, 2, 'ease-in');
```

It's possible to animate most positioning and formating CSS attributes.

```js
// Animates the color to red
n.one('#mydiv').anim({color:'#FF0000'});

// Hides an element by removing opacity
n.one('#mydiv').anim({opacity:0});

// Animates the background color and opacity
n.one('#mydiv').anim({background:'#00FF00', opacity:1});
```


<h2>Chaining with Node</h2>

Most node objects can be chained. 

```js
// Set the class and content of the node
n.one('#cat').addClass('lolcat').setContent('cheezburger');
```

Using the wait method, you can set delays in chained methods. This is useful for performing multiple animations, starting one after the other, or removing an element after an animation.

```js
// Update the content after animation
n.one('#cat').anim({left:100}).wait(2).setContent('cheezburger');

// Update the content after animation, then remove it
n.one('#cat').anim({left:100}).wait(2).setContent('cheezburger').wait(4).remove();
```


<h2>Events</h2>

It's possible to chain most events off of the node instance using node.on, or node.once.

```js
// Node.on fires an event every time that event happens
n.one('#myid').on('click', function (e) {
    // Assert: this == n.one('#myid')
});

n.one('#myid').once('click', function (e) {
    // Will only be called once
    // Detaches the event listener after firing once
});

// Use off to remove events
n.one('#myid').on('click', fn);
n.one('#myid').off('click', fn); // Listener removed
```

Event callbacks receive a special NWTEventInstance object.

```js
n.one('#myid').on('click', function (e) {

    // Prevents the event from bubbling up the dom
    e.noBubble();

    // Prevents the event from performing the default action
    e.noDefault();

    // Calls both e.noBubble and e.noDefault
    e.stop();
});
```


<h2>Additional Information</h2>

<h3>Filesize</h3>

```
Library      Filesize      Gzipped
------------------------------------
jQuery       93,868        33,447
NWTui         6,858
```
curl --compressed -so /dev/null http://localhost:3000/nwt.main.min.js -w '%{size_download}'
curl --compressed -so /dev/null http://code.jquery.com/jquery-1.7.1.min.js -w '%{size_download}'


<h3>Browser support</h3>

NWTui works well in the latest version of all modern browsers (Firefox, Safari, Chrome, IE10). For full IE support, we recommend a conditional tag inclusion.

```html
<!--[if lte IE 9]>
	<script type="text/javascript" src="/nwt.fallback.min.js"></script>
<![endif]-->
```