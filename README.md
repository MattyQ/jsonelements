# Elements.js

Elements.js is a native JavaScript library that converts JSON to HTML elements. The library can be used to create an individual node, a tree of nodes, or a complex map of nodes. 

## Hello, world!

For example, the content of a basic website can be initialized with the following code:

```
const helloWorld = {
  "type": "p",
  "textContent": "Hello, world!",
  "parentNode": document.body
}

ElementsJS.create(helloWorld);
```

The JSON is rendered into the following HTML.

![A website with one paragraph element that contains the text Hello, World!](helloWorldExample.png)
