# JSONElements

JSONElements is a native JavaScript library that uses JSON to create HTML elements. Normally, constructing HTML elements in native JavaScript requires a number of successive calls in order to apply attributes, styles, classes, event listeners, and more. With JSONElements, you can use a JavaScript object in place of the function calls usually needed to build, style, and render an element.

The library can be used to create an individual element, a tree of elements, or a complex collection of elements, all based on JSON templates. You can create HTML elements by calling the JSONElements interface (an abstract class) or by instantiating new JSONElements. In both cases, you describe the desired elements using JSON templates that conform to the JSONElement schema.

The only thing that distinguishes an HTML element created with the library from an element created with `document.createElement()` is the presence of a property that stores the JSON template. To avoid potential collision with other libraries, the property is keyed with a Symbol that is registered when the JSONElements library is loaded.

## Hello, world!

Basic content for an HTML document can be initialized with the following code:

```
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/gh/mattyq/jsonelementsjs@v0.2.0-pre-release/jsonelements.js"></script>
  </head>

  <body>
    <script>
      const helloWorld = {
        "element": "p",
        "textContent": "Hello, world!",
        "parentNode": document.body
      }

      JSONElements.create(helloWorld);
    </script>
  </body>

</html>
```

When `JSONElements.create()` is called, the JSON template is rendered into HTML. In this example, because `document.body` is supplied for the `parentNode` property, the new element is directly appended to the body of the HTML document.

## Usage

To load the JSONElements library, I recommend you use the jsDelivr CDN.

For the normal, unminified version:

```
<script src="https://cdn.jsdelivr.net/gh/mattyq/jsonelements@v0.2.0-pre-release/jsonelements.js"></script>
```

For the minified version:

```
<script src="https://cdn.jsdelivr.net/gh/mattyq/jsonelements@v0.2.0-pre-release/jsonelements.min.js"></script>
```

The script link can be placed in the head or body of your HTML document.

Example:

```
<head>
  ...
  <script src="https://cdn.jsdelivr.net/gh/mattyq/elementsjs@v0.1.0-pre-release/elements.min.js"></script>
</head>
```

## JSONElements classes

The JSONElements library provides the following classes:

- `JSONElements`
- `JSONElement`

### JSONElements class

`JSONElements` is an abstract class that provides the bulk of the library functionality. The `JSONElements` class is intended to be used as an interface and cannot be instantiated.

The `JSONElements` class has the following property:

- `key`: A Symbol that is registered when `JSONElements` is loaded. When you create an element with the JSONElements library, this Symbol is used as a key for the element property that stores the JSON template.

The `JSONElements` class has the following methods:

- `JSONElements.create(template)`
- `JSONElements.createMany(templatesArray, nodeMap)`
- `JSONElements.getJSONTemplate(element)`
- `JSONElements.isJSONElement(element)`

#### JSONElements.create(template)

The `JSONElements.create(template)` method takes a JSON template as a parameter and returns an HTML element. The JSON template is an object with at least one property, `type`, and must conform to the JSONElement schema.

If a valid element is provided for the `parentNode` property of the JSON template, the new element is immediately appended to the parent. The new element is returned by the method regardless of whether `parentNode` is used.

#### JSONElements.createMany(templatesArray, nodeMap)

The `JSONElements.createMany(templatesArray, nodeMap)` method has the following parameters:

- `templatesArray` is a required array of one or more JSON templates that conform to the JSONElement schema.
- `nodeMap` is an optional array of objects. Each object represents a parent-child relationship between two or more of the elements provided in `templatesArray`.

The method returns an array of elements in the order that they were provided in `templatesArray`.

#### JSONElements.getJSONTemplate(element)

The `JSONElements.getJSONTemplate(element)` method takes an element and returns the original JSON template object that was used to create the element.

#### JSONElements.isJSONElement(element)

The `JSONElements.isJSONElement(element)` method takes an element and returns a boolean value. The value is `true` if the element has the ElementJS key.

### JSONElement class

`JSONElement` is a class that can be used to create an HTML element or tree of elements. Unlike the `JSONElements` class, you can use the `new` operator with `JSONElement`. The class takes a JSON template that conforms to the JSONElement schema.

Example:

```
const helloWorld = {
  "element": "p",
  "textContent": "Hello, world!"
}

const element = new JSONElement(helloWorld);
```

When you create a new `JSONElement`, the template you provide is passed to `JSONElements.create()`, which returns the computed HTML element.

## JSONElement schema

The JSONElement schema defines the format of the JSON template objects expected by the JSONElements library.

The following properties are supported. Properties can be specified in any order. The only required property is `type`.

```
{
  "element": string,
  "id": string,
  "classes": array,
  "styles": object,
  "attributes": object,
  "eventListeners": array,
  "textContent": string,
  "innerHTML": string,
  "childArray": array,
  "childNodes": array,
  "parentNode": element
}
```

The following table describes the properties.

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>
      <code>element</code>
    </td>
    <td>
      <p>Required <code>string</code>. </p>
      <p>
        <code>element</code> must be an HTML tag that is valid for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement">document.createElement()</a>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>id</code>
    </td>
    <td>
      <p>Optional <code>string</code>. </p>
      <p>Sets the HTML <a target="_blank" href="https://www.w3schools.com/html/html_id.asp">
          id
        </a> attribute of the element. </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>classes</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>strings</code>. </p>
      <p>
        String values must be valid for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/classList">Element.classList.add()</a>.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>styles</code>
    </td>
    <td>
      <p>Optional <code>object</code>. </p>
      <p>Contains key-value pairs that correspond to styles and values. Keys must be valid properties for the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration">CSSStyleDeclaration</a> interface (for example, <code>backgroundColor</code> instead of <code>background-color</code>). </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>attributes</code>
    </td>
    <td>
      <p>Optional <code>object</code>. </p>
      <p>Contains key-value pairs that correspond to attributes and values. Keys must be valid attributes for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute">Element.setAttribute()</a>. </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>eventListeners</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>objects</code>. </p>
      <p>
        Objects in this array must contain one key-value pair. The key must be the event to listen for (for example, <code>click</code>). The value must be a function for the listener to trigger.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>textContent</code>
    </td>
    <td>
      <p>Optional <code>string</code>. </p>
      <p>Sets the plaintext content of the element.</p>
      <p>The <code>textContent</code> and <code>innerHTML</code> properties are mutually exclusive. If values are provided for both <code>textContent</code> and <code>innerHTML</code>, the plaintext content is overwritten when the HTML is set. </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>innerHTML</code>
    </td>
    <td>
      <p>Optional <code>string</code>. </p>
      <p>Must be a valid HTML string for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML">Element.setHTML()</a>. </p>
      <p>The <code>textContent</code> and <code>innerHTML</code> properties are mutually exclusive. If values are provided for both <code>textContent</code> and <code>innerHTML</code>, the plaintext content is overwritten when the HTML is set. </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>childArray</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>objects</code>. </p>
      <p>
        <code>objects</code> in this array must follow the JSONElement schema. This property can be used to build nested HTML elements, such as lists with list items or tables with rows and cells.
      </p>
      <p>Generally, <code>childArray</code> and <code>childNodes</code> should be considered mutually exclusive. If both properties are used, elements in <code>childArray</code> are appended to the new element first, and then elements in <code>childNodes</code>. If you want to specify a mix of nodes and element arrays, use <code>childNodes</code>. </p>
    </td>
  </tr>
  <tr>
    <td>
      <code>childNodes</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>elements</code>. </p>
      <p>Items in this array must be HTML elements. Because the <code>JSONElements.create()</code> method returns an element, you can also use this property to specify a mix of existing nodes and JSONElements arrays. For example: </p>
      <pre>const exampleElement = {
  "element": "p",
  "childNodes": [
    document.getElementById("example-id"),
    document.getElementsByClassName("example-class")[0],
    JSONElements.create({"element": "p", "id": "example-child-element"})
  ]
}
                  </pre>
    </td>
  </tr>
  <tr>
    <td>
      <code>parentNode</code>
    </td>
    <td>
      <p>Optional <code>element</code>. </p>
      <p>An HTML element to use as the parent for the new element.</p>
    </td>
  </tr>
</table>