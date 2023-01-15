class JSONElement {
  constructor(element) {
    if (ElementsJS.isJSONElement(element)) {
      return ElementsJS.create(ElementsJS.getJSONtemplate(element));
    } else if (typeof element === "object") {
      return ElementsJS.create(element);
    } else {
      throw new Error("JSONElement requires either an object that follows the JSONElement schema or an element created with ElementsJS.")
    }
  }

  static a(template=undefined, src=undefined, innerHTML=undefined, target=undefined) {
    const defaultTemplate = {"type": "a"};

    if (src) {
      defaultTemplate.attributes.src = src;
    }

    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    if (target) {
      defaultTemplate.attributes.target = target;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static div(template=undefined) {
    const defaultTemplate = {"type": "div"};
    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static h1(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "h1"};

    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static h2(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "h2"};
    
    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static h3(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "h3"};
    
    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static h4(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "h4"};
    
    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static h5(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "h5"};
    
    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static h6(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "h6"};
    
    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static img(template=undefined, src=undefined, alt=undefined) {
    const defaultTemplate = {"type": "img"};
    
    if (src) {
      defaultTemplate.attributes.src = src;
    }

    if (alt) {
      defaultTemplate.attributes.alt = alt;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static ol(template=undefined, items=undefined) {
    const defaultTemplate = {"type": "ol"};
    
    if (items) {
      defaultTemplate.childArray = [];

      for (const item in items) {
        const thisItem = {
          "type": "li",
          "innerHTML": item
        }

        defaultTemplate.childArray.push(thisItem);
      }
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static p(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "p"};
    
    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static pre(template=undefined, innerHTML=undefined) {
    const defaultTemplate = {"type": "pre"};
    
    if (innerHTML) {
      defaultTemplate.innerHTML = innerHTML;
    }

    const element = ElementsJS.merge(template, defaultTemplate);

    return ElementsJS.create(element);
  }

  static ul(items, template=undefined) {
    const defaultTemplate = {"type": "ul"};
    
    if (items) {
      defaultTemplate.childArray = [];

      for (const item in items) {
        const thisItem = {
          "type": "li",
          "innerHTML": item
        }

        defaultTemplate.childArray.push(thisItem);
      }
    }

    const element = ElementsJS.merge(template, defaultTemplate);

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

  static #mergeTemplates(originalTemplate, modifiedTemplate) {
    var updatedTemplate = {};
    
    if (typeof originalTemplate === "object") {
      updatedTemplate = structuredClone(originalTemplate);
    }

    for (const [property, value] of Object.entries(modifiedTemplate)) {
      updatedTemplate[property] = structuredClone(value);
    }

    return updatedTemplate;
  }

  constructor() {
    throw new Error("The ElementsJS class cannot be instantiated.");
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

  static merge(template1, template2) {
    return this.#mergeTemplates(template1, template2);
  }

  static getJSONtemplate(element) {
    return element[this.key];
  }

  static updateJSONtemplate(element, template) {
    element[this.key] = this.#mergeTemplates(this.getJSONtemplate(element), template);
    return element[this.key];
  }

  static isJSONElement(element) {
    if (element[this.key]) {
      return true;
    }

    return false;
  }
}
