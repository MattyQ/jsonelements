class JSONElement {
  constructor(element) {
    return ElementsJS.create(element);
  }
}

class ElementsJS {
  static #SYMBOL = Symbol("ElementsJS");

  static #setElementId(element, id) {
    element.setAttribute('id', id);
  }

  static #setElementClasses(element, classes) {
    classes.forEach(function(thisClass) {
      element.classList.add(thisClass);
    });
  }

  static #setElementStyles(element, styles) {
    for (const style in styles) {
      element.style[style] = styles[style];
    }
  }

  static #setElementAttributes(element, attributes) {
    for (const attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }

  static #setElementTextContent(element, textContent) {
    element.appendChild(document.createTextNode(textContent));
  }

  static #setElementInnerHTML(element, innerHTML) {
    element.setHTML(innerHTML);
  }

  static #setElementEventListeners(element, eventListeners) {
    eventListeners.forEach(function(listener) {
      for (const event in listener) {
        element.addEventListener(event, listener[event]);
      }
    });
  }

  static #newElement(template) {
    const element = document.createElement(template.type);
    element[this.key] = template;

    if (template.id) {
      this.#setElementId(element, template.id);
    }

    if (template.classes) {
      this.#setElementClasses(element, template.classes);
    }

    if (template.styles) {
      this.#setElementStyles(element, template.styles);
    }

    if (template.attributes) {
      this.#setElementAttributes(element, template.attributes);
    }

    if (template.textContent) {
      this.#setElementTextContent(element, template.textContent);
    }

    if (template.innerHTML) {
      this.#setElementInnerHTML(element, template.innerHTML);
    }

    if (template.eventListeners) {
      this.#setElementEventListeners(element, template.eventListeners);
    }

    if (template.childArray) {
      template.childArray.forEach(function(child) {
        element.appendChild(new JSONElement(child));
      });
    }

    if (template.childNodes) {
      template.childNodes.forEach(function(child) {
        element.appendChild(child);
      });
    }

    if (template.parentNode) {
      template.parentNode.appendChild(element);
    }

    return element;
  }

  constructor() {
    throw new Error("The ElementsJS class cannot be instanced.");
  }

  static get key() {
    return this.getSymbol();
  }

  static getSymbol() {
    return this.#SYMBOL;
  }

  static create(element) {
    return this.#newElement(element);
  }

  static createMany(elements, nodeMap=undefined) {
    const elementsArray = [];
    elements.forEach(function(element) {
      elementsArray.push(new JSONElement(element));
    });

    if (nodeMap) {
      nodeMap.forEach(function(map) {
        for (const parent in map) {
          map[parent].forEach(function(child) {
            elementsArray[parent].appendChild(elementsArray[child]);
          });
        }
      });
    }
    
    return elementsArray;
  }

  static getJSONtemplate(element) {
    return element[this.key];
  }

  static isJSONElement(element) {
    if (element[this.key]) {
      return true;
    }

    return false;
  }
}

/**

nodeMap is an optional array of objects that illustrates the DOM hierarchy of the elements you're creating. The object keys correspond to the parent element. The object values correspond to the children that should be appended to that parent. If included, createMany builds the hierarchy in the map.

Given an element array like:
[
  {"type": "p"}, // 0
  {"type": "p"}, // 1
  {"type": "div"}, // 2
  {"type": "form"}, // 3
  {"type": "input"} // 4
]

The example nodeMap:
  - Appends the first two `p` items to the `div`  
  - Appends the `input` to the `form`
  - Appends the `form` to the `div`
  
The nodeMap looks like this:
[
  {2: [0, 1]},
  {3: [4]},
  {2: [3]}
]

Or like this, if preferred:
[
  {2: [0, 1], 3: [4]},
  {2: [3]}
]

**/
