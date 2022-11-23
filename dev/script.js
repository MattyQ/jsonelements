const builder = {
  elements: {
    app: document.getElementById('object-builder'),
    model: undefined
  },
  data: {
    model: {}
  },
  init: function() {
    builder.methods.createModelNode();
  },
  methods: {
    newKVNode: function() {
      const li = elements.create({
        'type': 'li',
        'childArray': [
          {
            'type': 'div',
            'classes': ['key'],
            'childArray': [
              {
                'type': 'input',
                'attributes': {'type': 'text', 'value': 'Key'}
              }
            ]
          },
          {
            'type': 'div',
            'classes': ['value'],
            'childArray': [
              {
                'type': 'input',
                'attributes': {'type': 'button', 'value': '+'}
              }
            ]
          }
        ]
      });

      return li;
    },
    newAddKeyNode: function() {
      const newKeyButton = document.createElement('input');
      newKeyButton.setAttribute('type', 'button');
    },
    createModelNode: function() {
      elements.create({
        'type': 'ul',
        'attributes': {'id': 'object-model'},
        'childNodes': [builder.methods.newKVNode()],
        'parentNode': builder.elements.app
      });
    }
  }
}

builder.init();