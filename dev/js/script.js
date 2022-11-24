const helloWorld = {
  'type': 'div',
  'id': 'hello-world',
  'styles': {
    'position': 'fixed',
    'height': '90vh',
    'width': '90vw',
    'top': '5vh',
    'left': '5vw',
    'border': '2px solid black',
    'borderRadius': '5px',
    'boxSizing': 'border-box',
    'padding': '5px'
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
      'innerHTML': 'The page is written as a JSON object and then rendered by calling <code>elements.create</code>.'
    }
  ]
}

elements.create(helloWorld);