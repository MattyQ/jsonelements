# JSONElements

JSONElements is a native JavaScript library that uses JSON to create HTML elements. Normally, constructing HTML elements in native JavaScript requires a number of successive calls in order to apply attributes, styles, classes, event listeners, and more. With JSONElements, you can use a JavaScript object in place of the function calls usually needed to build, style, and render an element.

The library can be used to create an individual element, a tree of elements, or a complex collection of elements, all based on JSON templates. You can create HTML elements by calling the JSONElements interface (an abstract class) or by instantiating new JSONElements. In both cases, you describe the desired elements using JSON templates that conform to the JSONElement schema.

The only thing that distinguishes an HTML element created with the library from an element created with `document.createElement()` is the presence of a property that stores JSONElements values (for now just the JSON template). To avoid potential collision with other libraries, the property is keyed with a Symbol that is registered when the JSONElements library is loaded.

## Hello, world!

Basic content for an HTML document can be initialized with the following code:

```
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/gh/mattyq/jsonelements@v0.2.0-pre-release/jsonelements.js"></script>
    <script>
      JSONElements.create({
        "element": "p",
        "textContent": "Hello, world!",
        "parentSelector": "body"
      });
    </script>
  </head>

  <body>
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
  <script src="https://cdn.jsdelivr.net/gh/mattyq/jsonelements@v0.2.0-pre-release/jsonelements.min.js"></script>
</head>
```

## JSONElements classes

The JSONElements library provides the following classes:

- `JSONElements`
- `JSONElement`

### JSONElements class

`JSONElements` is an abstract class that provides the bulk of the library functionality. The `JSONElements` class is intended to be used as an interface, and can be instantiated to create collections of template elements.

The `JSONElements` class has the following properties:

- `defaultElements`: An object that contains the templates used to create the default element shortcuts. The list is not exhaustive, but it does include the most common HTML elements.

- `key`: A Symbol that is registered when `JSONElements` is loaded. When you create an element with the JSONElements library, this Symbol is used as a key for the element property that stores the JSON template.

The `JSONElements` class has the following methods:

- `create(template)`
- `createMany(templatesArray, nodeMap)`
- `getJSONTemplate(element)`
- `images(images)`
- `isJSONElement(element)`
- `links(links)`
- `merge(template1, template2)`
- `parse(templateStringArray)`
- `text(string)`
- `updateJSONTemplate(element, template)`

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

## JSONElements functions

The JSONElements library provides the following function:

- `_e`

### _e template syntax

The `_e` function is a template literal tag that can be used to create JSON templates. The function takes a string or array of strings as a parameter and returns a JSON template object. With `_e`, you can create JSON templates without having to escape quotes, and nest templates within templates.

For example, the `Hello, world!` example can be refactored using `_e`:

```js
_e
  `${{
    "element": "p",
    "parentSelector": "body"
  }}
  Hello, world!`;
```

`_e` is initialized with a set of default element shortcuts. The list is not exhaustive, but it does include the most common HTML elements:

<details>
  <summary>Expand list of supported elements</summary>
  
  - `a`
  - `abbr`
  - `address`
  - `area`
  - `article`
  - `aside`
  - `audio`
  - `b`
  - `base`
  - `bdi`
  - `bdo`
  - `blockquote`
  - `body`
  - `br`
  - `button`
  - `canvas`
  - `caption`
  - `cite`
  - `code`
  - `col`
  - `colgroup`
  - `data`
  - `datalist`
  - `dd`
  - `del`
  - `details`
  - `dfn`
  - `dialog`
  - `div`
  - `dl`
  - `dt`
  - `em`
  - `embed`
  - `fieldset`
  - `figcaption`
  - `figure`
  - `footer`
  - `form`
  - `h1`
  - `h2`
  - `h3`
  - `h4`
  - `h5`
  - `h6`
  - `head`
  - `header`
  - `hr`
  - `html`
  - `i`
  - `iframe`
  - `img`
  - `input`
  - `ins`
  - `kbd`
  - `label`
  - `legend`
  - `li`
  - `link`
  - `main`
  - `map`
  - `mark`
  - `meta`
  - `meter`
  - `nav`
  - `noscript`
  - `object`
  - `ol`
  - `optgroup`
  - `option`
  - `output`
  - `p`
  - `param`
  - `picture`
  - `pre`
  - `progress`
  - `q`
  - `rp`
  - `rt`
  - `ruby`
  - `s`
  - `samp`
  - `script`
  - `section`
  - `select`
  - `small`
  - `source`
  - `span`
  - `strong`
  - `style`
  - `sub`
  - `summary`
  - `sup`
  - `table`
  - `tbody`
  - `td`
  - `template`
  - `textarea`
  - `tfoot`
  - `th`
  - `thead`
  - `time`
  - `title`
  - `tr`
  - `track`
  - `u`
  - `ul`
  - `var`
  - `video`
  - `wbr`
</details>
<br>

For example, if we want to nest the `Hello, world!` paragraph inside another element only using `_e`:

```js
_e
  `${{
    "element": "div",
    "parentSelector": "body"
  }}
  ${_e.p
    `Hello, world!`
  }`;
```

The following example mixes `_e` with the `JSONElements.create()` method, and uses the `JSONElement` class:

```js
  const element = new JSONElement({
    "element": document.body,
    "childNodes": [
      _e.h1
        `Hello, world!`,
      _e.p
        `This is a paragraph.`
    ]
  });
```

## JSONElement schema

HTML elements for JSONElements are defined in JSON. The following properties are supported.

Properties can be specified in any order. The only required property is `element`.

<pre>{
  "<a href="#schema-element">element</a>": <code>string</code>,
  "<a href="#schema-id">id</a>": <code>string</code>,
  "<a href="#schema-classes">classes</a>": <code>array</code>,
  "<a href="#schema-styles">styles</a>": <code>object</code>,
  "<a href="#schema-attributes">attributes</a>": <code>object</code>,
  "<a href="#schema-event-listeners">eventListeners</a>": <code>array</code>,
  "<a href="#schema-text-content">textContent</a>": <code>string</code>,
  "<a href="#schema-inner-html">innerHTML</a>": <code>string</code>,
  "<a href="#schema-child-array">childArray</a>": <code>array</code>,
  "<a href="#schema-child-nodes">childNodes</a>": <code>array</code>,
  "<a href="#schema-parent-node">parentNode</a>": <code>node</code>,
  "<a href="#schema-parent-selector">parentSelector</a>": <code>string</code>,
  "<a href="#schema-attribute">[...attribute]</a>": <code>string</code>
}</pre>

The following table describes the properties.

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td id="schema-element">
      <code>element</code>
    </td>
    <td>
      <p>Required <code>string</code> or <code>Element</code>.</p>
      <p><code>element</code> must be an HTML tag that is valid for <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement"
          target="_blank">document.createElement()</a> or an <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">Element</a>.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-id">
      <code>id</code>
    </td>
    <td>
      <p>Optional <code>string</code>.</p>
      <p>Sets the HTML <a href="https://www.w3schools.com/html/html_id.asp" target="_blank"><code>id</code></a>
        attribute of the element.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-classes">
      <code>classes</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>strings</code>.</p>
      <p><code>string</code> values must be valid for <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Element/classList"
          target="_blank">Element.classList.add()</a>.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-styles">
      <code>styles</code>
    </td>
    <td>
      <p>Optional <code>object</code>.</p>
      <p>Contains key-value pairs that correspond to styles and values, such as
        <code>{"backgroundColor": "red"}</code>. Keys must be valid properties for the <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration"
          target="_blank">CSSStyleDeclaration</a> interface (for example, <code>backgroundColor</code> instead
        of <code>background-color</code>).
      </p>
    </td>
  </tr>
  <tr>
    <td id="schema-attributes">
      <code>attributes</code>
    </td>
    <td>
      <p>Optional <code>object</code>.</p>
      <p>Contains key-value pairs that correspond to attributes and values, such as
        <code>{"data-example": "example value"}</code>. Keys must be valid attributes for the <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute"
          target="_blank">Element.setAttribute()</a>.
      </p>
    </td>
  </tr>
  <tr>
    <td id="schema-event-listeners">
      <code>eventListeners</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>objects</code>.</p>
      <p><code>objects</code> in this array must contain one key-value pair. The key must be the event to listen
        for (for example, <code>click</code>). The value must be a function for the listener to trigger.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-text-content">
      <code>textContent</code>
    </td>
    <td>
      <p>Optional <code>string</code>.</p>
      <p>The <code>textContent</code> and <code>innerHTML</code> properties are mutually exclusive. If values are
        provided for both <code>textContent</code> and <code>innerHTML</code>, the plaintext content is
        overwritten when the HTML is set.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-inner-html">
      <code>innerHTML</code>
    </td>
    <td>
      <p>Optional <code>string</code>.</p>
      <p>Must be a valid HTML string for <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML"
          target="_blank">Element.setHTML()</a>.</p>
      <p>The <code>textContent</code> and <code>innerHTML</code> properties are mutually exclusive. If values are
        provided for both <code>textContent</code> and <code>innerHTML</code>, the plaintext content is
        overwritten when the HTML is set.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-child-array">
      <code>childArray</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>objects</code>.</p>
      <p><code>objects</code> in this array must follow the JSONElements object schema. This property can be used
        to build nested HTML elements, such as lists with list items or tables with rows and cells.</p>
      <p>Generally, <code>childArray</code> and <code>childNodes</code> should be considered mutually exclusive.
        If both properties are used, elements in <code>childArray</code> are appended to the new element first,
        and then elements in <code>childNodes</code>. If you want to specify a mix of nodes and element arrays,
        use <code>childNodes</code>.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-child-nodes">
      <code>childNodes</code>
    </td>
    <td>
      <p>Optional <code>array</code> of <code>nodes</code>.</p>
      <p>Items in this array must be HTML element nodes. Because the <code>element.create()</code> method and
        <code>_e</code> template syntax return nodes, you can also use this property to specify a mix of
        existing and new nodes created in a variety of ways. For example:
      </p>
      <pre>const exampleElement = {
  "element": "p",
  "childNodes": [
    document.getElementById("example-id"),
    document.getElementsByClassName("example-class")[0],
    document.createElement("p"),
    JSONElements.create({"element": "p", "id": "example-child-element"}),
    _e.p`example child element`    
  ]
}</pre>
    </td>
  </tr>
  <tr>
    <td id="schema-parent-node">
      <code>parentNode</code>
    </td>
    <td>
      <p>Optional <code>node</code>.</p>
      <p>An HTML element node to use as the parent for the new element.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-parent-selector">
      <code>parentSelector</code>
    </td>
    <td>
      <p>Optional <code>string</code>.</p>
      <p>An HTML element node to use as the parent for the new element.</p>
    </td>
  </tr>
  <tr>
    <td id="schema-attribute">
      <code>[...attribute]</code>
    </td>
    <td>
      <p>Optional <code>string</code>.</p>
      <p>In addition to the properties that are enumerated in this table, the JSONElement schema accepts all <a
          href="https://www.w3schools.com/tags/ref_attributes.asp" target="_blank">HTML attributes</a>,
        including event handlers and <a
          href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes" target="_blank">ARIA
          attributes</a>. For example:</p>
      <pre>{
  "element": "a",
  "href": "https://www.example.com",
  "target": "_blank"
}</pre>
    </td>
  </tr>
</table>