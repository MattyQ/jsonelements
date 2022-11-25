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
                  'innerHTML': '<code>string</code> values must be valid for <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/classList"><code>Element.classList.add()<code></a>.'
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
              'innerHTML': '<code></code>'
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
              'innerHTML': '<code></code>'
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
              'innerHTML': '<code></code>'
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
              'innerHTML': '<code></code>'
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
              'innerHTML': '<code></code>'
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
              'innerHTML': '<code></code>'
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
              'innerHTML': '<code></code>'
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
              'innerHTML': '<code></code>'
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
        }
      ]
    }
  ]
}

elements.create(helloWorld);