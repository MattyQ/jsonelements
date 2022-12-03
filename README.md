# Elements.js

Elements.js is a native JavaScript library that uses JSON to create HTML elements. Normally, constructing HTML elements in native JavaScript requires a number of successive calls in order to apply attributes, styles, classes, event listeners, and more. With elements.js, you can use a JavaScript object in place of the function calls usually needed to build, style, and render an element.

The library can be used to create an individual element, a tree of elements, or a complex collection of elements, all based on JSON templates. You can create HTML elements by calling the ElementsJS interface (an abstract class) or by instantiating new JSONElements. In both cases, you describe the desired elements using JSON templates that conform to the JSONElement schema.

The only thing that distinguishes an HTML element created with the library from an element created with `document.createElement()` is the presence of a property that stores the JSON template. To avoid potential collision with other libraries, the property is keyed with a Symbol that is registered when the elements.js library is loaded.

## Hello, world!

Basic content for an HTML document can be initialized with the following code:

```
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/gh/mattyq/elementsjs@v0.1.0-pre-release/elements.js"></script>
  </head>

  <body>
    <script>
      const helloWorld = {
        "type": "p",
        "textContent": "Hello, world!",
        "parentNode": document.body
      }

      ElementsJS.create(helloWorld);
    </script>
  </body>

</html>
```

When `ElementsJS.create()` is called, the JSON template is rendered into HTML. In this example, because `document.body` is supplied for the `parentNode` property, the new element is directly appended to the body of the HTML document.

## Usage

To load the elements.js library, I recommend you use the jsDelivr CDN.

For the normal, unminified version:

```
<script src="https://cdn.jsdelivr.net/gh/mattyq/elementsjs@v0.1.0-pre-release/elements.js"></script>
```

For the minified version:

```
<script src="https://cdn.jsdelivr.net/gh/mattyq/elementsjs@v0.1.0-pre-release/elements.min.js"></script>
```

The script link can be placed in the head or body of your HTML document.

Example:

```
<head>
  ...
  <script src="https://cdn.jsdelivr.net/gh/mattyq/elementsjs@v0.1.0-pre-release/elements.min.js"></script>
</head>
```

## Elements.js classes

The elements.js library provides the following classes:

- `ElementsJS`
- `JSONElement`

### ElementsJS class

`ElementsJS` is an abstract class that provides the bulk of the library functionality. The `ElementsJS` class is intended to be used as an interface and cannot be instantiated.

The `ElementsJS` class has the following property:

- `key`: A Symbol that is registered when `ElementsJS` is loaded. When you create an element with the elements.js library, this Symbol is used as a key for the element property that stores the JSON template.

The `ElementsJS` class has the following methods:

- `ElementsJS.create(template)`
- `ElementsJS.createMany(templatesArray, nodeMap)`
- `ElementsJS.getJSONTemplate(element)`
- `ElementsJS.isJSONElement(element)`

#### ElementsJS.create(template)

The `ElementsJS.create(template)` method takes a JSON template as a parameter and returns an HTML element. The JSON template is an object with at least one property, `type`, and must conform to the JSONElement schema.

If a valid element is provided for the `parentNode` property of the JSON template, the new element is immediately appended to the parent. The new element is returned by the method regardless of whether `parentNode` is used.

#### ElementsJS.createMany(templatesArray, nodeMap)

The `ElementsJS.createMany(templatesArray, nodeMap)` method has the following parameters:

- `templatesArray` is a required array of one or more JSON templates that conform to the JSONElement schema.
- `nodeMap` is an optional array of objects. Each object represents a parent-child relationship between two or more of the elmements provided in `templatesArray`.

The method returns an array of elements in the order that they were provided in `templatesArray`.

#### ElementsJS.getJSONTemplate(element)

The `ElementsJS.getJSONTemplate(element)` method takes an element and returns the original JSON template object that was used to create the element.

#### ElementsJS.isJSONElement(element)

The `ElementsJS.isJSONElement(element)` method takes an element and returns a boolean value. The value is `true` if the element has the ElementJS key.

### JSONElement class

`JSONElement` is a class that can be used to create an HTML element or tree of elements. Unlike the `ElementsJS` class, you can use the `new` operator with `JSONElement`. The class takes a JSON template that conforms to the JSONElement schema.

Example:

```
const helloWorld = {
  "type": "p",
  "textContent": "Hello, world!"
}

const element = new JSONElement(helloWorld);
```

When you create a new `JSONElement`, the template you provide is passed to `ElementsJS.create()`, which returns the computed HTML element.