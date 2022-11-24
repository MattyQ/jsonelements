const helloWorld = {
  'type': 'div',
  'textContent': 'Hello, world!',
  'styles': {
    'position': 'fixed',
    'height': '90vh',
    'width': '90vw',
    'top': '5vh',
    'left': '5vw',
    'backgroundColor': '#81FB33',
    'border': '2px solid black',
    'borderRadius': '5px',
    'boxSizing': 'border-box',
    'textAlign': 'center',
    'lineHeight': '90vh'
  },
  'parentNode': document.body
}

elements.create(helloWorld);