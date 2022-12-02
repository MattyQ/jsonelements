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

  static #setElementChildArray(element, childArray) {
    childArray.forEach(function(child) {
      element.appendChild(new JSONElement(child));
    });
  }

  static #setElementChildNodes(element, childNodes) {
    childNodes.forEach(function(child) {
      element.appendChild(child);
    });
  }

  static #setElementParentNode(element, parentNode) {
    parentNode.appendChild(element);
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
      this.#setElementChildArray(element, template.childArray);
    }

    if (template.childNodes) {
      this.#setElementChildNodes(element, template.childNodes);
    }

    if (template.parentNode) {
      this.#setElementParentNode(element, template.parentNode);
    }

    return element;
  }

  static #buildElementsArray(elements) {
    const elementsArray = [];

    elements.forEach(function(element) {
      elementsArray.push(new JSONElement(element));
    });

    return elementsArray;
  }

  static #applyNodeMap(elementsArray, nodeMap) {
    nodeMap.forEach(function(map) {
      for (const parent in map) {
        map[parent].forEach(function(child) {
          elementsArray[parent].appendChild(elementsArray[child]);
        });
      }
    });
  }

  static #newElements(elements, nodeMap=undefined) {
    const elementsArray = this.#buildElementsArray(elements);
    
    if (nodeMap) {
      this.#applyNodeMap(elementsArray, nodeMap);
    }
    
    return elementsArray;
  }

  static #getSymbol() {
    return this.#SYMBOL;
  }

  constructor() {
    throw new Error("The ElementsJS class cannot be instanced.");
  }

  static get key() {
    return this.#getSymbol();
  }

  static create(element) {
    return this.#newElement(element);
  }

  static createMany(elements, nodeMap=undefined) {
    return this.#newElements(elements, nodeMap);
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
