const helloWorld = {
  'type': 'div',
  'id': 'hello-world',
  'styles': {
    'position': 'fixed',
    'height': '90vh',
    'width': '90vw',
    'top': '5vh',
    'left': '5vw',
    'border': '1px solid black',
    'boxSizing': 'border-box',
    'padding': '10px',
    'overflow': 'auto'
  },
  'parentNode': document.body,
  'childArray': [
    {
      'type': 'h1',
      'textContent': 'Hello, world!'
    },
    {
      'type': 'p',
      'textContent': 'This is a functional example of elements.js in action.'
    },
    {
      'type': 'p',
      'innerHTML': 'This page is written as a JSON object and then rendered by calling <code>elements.create</code>.'
    },
    {
      'type': 'h2',
      'textContent': 'Element schema'
    },
    {
      'type': 'p',
      'innerHTML': 'HTML elements for elements.js are defined in JSON. The following properties are supported. Properties can be specified in any order. The only required property is <code>type</code>.'
    },
    {
      'type': 'pre',
      'textContent': `{
  "type": string, // type must be an HTML tag that is valid for document.createElement
  "id": string, // optional id for element
  "classes": array, // optional array of strings, must be valid for Element.classList.add
  "styles": object, // optional object that contains styles and corresponding values, keys must be valid properties for CSSStyleDeclaration object (e.g., backgroundColor instead of background-color).
  "attributes": object, // optional object that contains attributes and corresponding values, must be valid strings for Element.setAttribute.
  "eventListeners": array, // optional array of objects. Objects should have one property, which corresponds to the event type for the listener. The value should be the function to call
  "textContent": string, // optional string that is added as a text node to the element
  "innerHTML": string, // optional string of valid HTML for element.innerHTML
  "childArray": array, // optional array of element arrays. Lets you build a nested HTML structure.
  "childNodes": array, // optional array of element nodes to append as children
  "parentNode": element node // optional element to use as a parent for this element
}`
    },
    {
      'type': 'table',
      'childArray': [
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'th',
              'textContent': 'Property'
            },
            {
              'type': 'th',
              'textContent': 'Description'
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>type</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Required <code>string</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': '<code>type</code> must be an HTML tag that is valid for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement">document.createElement()</a>.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>id</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>string</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'Sets the HTML <a target="_blank" href="https://www.w3schools.com/html/html_id.asp"><code>id</code></a> attribute of the element.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>classes</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>array</code> of <code>strings</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': '<code>string</code> values must be valid for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/classList">Element.classList.add()</a>.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>styles</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>object</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'Contains key-value pairs that correspond to styles and values. Keys must be valid properties for the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration">CSSStyleDeclaration</a> interface (for example, <code>backgroundColor</code> instead of <code>background-color</code>).'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>attributes</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>object</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'Contains key-value pairs that correspond to attributes and values. Keys must be valid attributes for the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute">Element.setAttribute()</a>.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>eventListeners</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>array</code> of <code>objects</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': '<code>objects</code> in this array must contain one key-value pair. The key must be the event to listen for (for example, <code>click</code>). The value must be a function for the listener to trigger.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>textContent</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>string</code>.'
                },
                {
                  'type': 'p',
                  'textContent': 'Sets the plaintext content of the element.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'The <code>textContent</code> and <code>innerHTML</code> properties are mutually exclusive. If values are provided for both <code>textContent</code> and <code>innerHTML</code>, the plaintext content is overwritten when the changes to the inner HTML are applied.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>innerHTML</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>string</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'Must be a valid HTML string for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML">Element.innerHTML</a>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'The <code>textContent</code> and <code>innerHTML</code> properties are mutually exclusive. If values are provided for both <code>textContent</code> and <code>innerHTML</code>, the plaintext content is overwritten when the changes to the inner HTML are applied.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>childArray</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>array</code> of <code>objects</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': '<code>objects</code> in this array must follow the elements.js object schema. This property can be used to build nested HTML elements, such as lists with list items or tables with rows and cells.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'Generally, <code>childArray</code> and <code>childNodes</code> should be considered mutually exclusive. If both properties are used, elements in <code>childArray</code> are appended to the new element first, and then elements in <code>childNodes</code>. If you want to specify a mix of nodes and element arrays, use <code>childNodes</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'This page is a functional example of using <code>childArray</code> to construct nested HTML elements.'
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>childNodes</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>array</code> of <code>nodes</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'Items in this array must be HTML element nodes. Because the <code>element.create()</code> method returns a node, you can also use this property to specify a mix of existing nodes and elements.js arrays. For example:'
                },
                {
                  'type': 'pre',
                  'textContent': `const exampleElement = {
  "type": "p",
  "childNodes": [
    document.getElementById("example-id"),
    document.getElementsByClass("example-class")[0],
    elements.create({"type": "p", "id": "example-child-element"})
  ]
}
                  `
                }
              ]
            }
          ]
        },
        {
          'type': 'tr',
          'childArray': [
            {
              'type': 'td',
              'innerHTML': '<code>parentNode</code>'
            },
            {
              'type': 'td',
              'childArray': [
                {
                  'type': 'p',
                  'innerHTML': 'Optional <code>node</code>.'
                },
                {
                  'type': 'p',
                  'innerHTML': 'An HTML element node to use as the parent for the new element.'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

elements.create(helloWorld);