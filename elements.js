"use strict";

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
    if (typeof template === "string") {
      template = {"type": template};
    }

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

  static #parseTemplateString(templateStringArray, elementOverride=undefined) {
    const elementsArray = templateStringArray;
    const stringsArray = structuredClone(elementsArray.shift());

    let element = undefined;

    if (elementOverride) {
      element = new JSONElement(elementOverride);
    } else {
      stringsArray.splice(0, 1);
      const template = elementsArray.shift();
  
      if (template instanceof Element) {
        element = template;
      } else if (typeof template === "object" || typeof template === "string") {
        element = new JSONElement(template);
      } else {
        throw new Error("_e requires a valid string for document.createElement(), an object that follows the JSONElement schema, or an element.");
      }
    }

    for (let i = stringsArray.length; i > 0; i--) {
      element.appendChild(ElementsJS.text(stringsArray.shift()));

      if (elementsArray.length > 0) {
        element.appendChild(elementsArray.shift());
      }
    }

    return element;
  }

  static #Shortcuts = class {
    constructor(templates=undefined) {
      const _e = function() {
        return ElementsJS.#parseTemplateString([...arguments]);
      }

      if (templates) {
        for (const [name, template] of Object.entries(templates)) {
          _e[name] = function() {
            return ElementsJS.#parseTemplateString([...arguments], template);
          }
        }
      }
      
      return _e;
    }
  }

  constructor(templates=undefined) {
    return new ElementsJS.#Shortcuts(templates);
  }

  static get key() {
    return ElementsJS.#SYMBOL;
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

  static text(string) {
    return document.createTextNode(string);
  }

  static parse(templateStringArray) {
    if (arguments.length > 1) {
      return this.#parseTemplateString([...arguments])
    }
    
    return this.#parseTemplateString(templateStringArray);
  }
}

class JSONElement {
  constructor(element) {
    if (ElementsJS.isJSONElement(element)) {
      return ElementsJS.create(ElementsJS.getJSONtemplate(element));
    } else if (typeof element === "object" || typeof element === "string") {
      return ElementsJS.create(element);
    } else {
      throw new Error("JSONElement requires a valid string for document.createElement(), an object that follows the JSONElement schema, or an element created with the elements.js library.")
    }
  }
}

const _e = new ElementsJS({
  "a": {"type": "a"},
  "abbr": {"type": "abbr"},
  "address": {"type": "address"},
  "area": {"type": "area"},
  "article": {"type": "article"},
  "aside": {"type": "aside"},
  "audio": {"type": "audio"},
  "b": {"type": "b"},
  "base": {"type": "base"},
  "bdi": {"type": "bdi"},
  "bdo": {"type": "bdo"},
  "blockquote": {"type": "blockquote"},
  "body": {"type": "body"},
  "br": {"type": "br"},
  "button": {"type": "button"},
  "canvas": {"type": "canvas"},
  "caption": {"type": "caption"},
  "cite": {"type": "cite"},
  "code": {"type": "code"},
  "col": {"type": "col"},
  "colgroup": {"type": "colgroup"},
  "data": {"type": "data"},
  "datalist": {"type": "datalist"},
  "dd": {"type": "dd"},
  "del": {"type": "del"},
  "details": {"type": "details"},
  "dfn": {"type": "dfn"},
  "dialog": {"type": "dialog"},
  "div": {"type": "div"},
  "dl": {"type": "dl"},
  "dt": {"type": "dt"},
  "em": {"type": "em"},
  "embed": {"type": "embed"},
  "fieldset": {"type": "fieldset"},
  "figcaption": {"type": "figcaption"},
  "figure": {"type": "figure"},
  "footer": {"type": "footer"},
  "form": {"type": "form"},
  "h1": {"type": "h1"},
  "h2": {"type": "h2"},
  "h3": {"type": "h3"},
  "h4": {"type": "h4"},
  "h5": {"type": "h5"},
  "h6": {"type": "h6"},
  "head": {"type": "head"},
  "header": {"type": "header"},
  "hr": {"type": "hr"},
  "html": {"type": "html"},
  "i": {"type": "i"},
  "iframe": {"type": "iframe"},
  "img": {"type": "img"},
  "input": {"type": "input"},
  "ins": {"type": "ins"},
  "kbd": {"type": "kbd"},
  "label": {"type": "label"},
  "legend": {"type": "legend"},
  "li": {"type": "li"},
  "link": {"type": "link"},
  "main": {"type": "main"},
  "map": {"type": "map"},
  "mark": {"type": "mark"},
  "meta": {"type": "meta"},
  "meter": {"type": "meter"},
  "nav": {"type": "nav"},
  "noscript": {"type": "noscript"},
  "object": {"type": "object"},
  "ol": {"type": "ol"},
  "optgroup": {"type": "optgroup"},
  "option": {"type": "option"},
  "output": {"type": "output"},
  "p": {"type": "p"},
  "param": {"type": "param"},
  "picture": {"type": "picture"},
  "pre": {"type": "pre"},
  "progress": {"type": "progress"},
  "q": {"type": "q"},
  "rp": {"type": "rp"},
  "rt": {"type": "rt"},
  "ruby": {"type": "ruby"},
  "s": {"type": "s"},
  "samp": {"type": "samp"},
  "script": {"type": "script"},
  "section": {"type": "section"},
  "select": {"type": "select"},
  "small": {"type": "small"},
  "source": {"type": "source"},
  "span": {"type": "span"},
  "strong": {"type": "strong"},
  "style": {"type": "style"},
  "sub": {"type": "sub"},
  "summary": {"type": "summary"},
  "sup": {"type": "sup"},
  "table": {"type": "table"},
  "tbody": {"type": "tbody"},
  "td": {"type": "td"},
  "template": {"type": "template"},
  "textarea": {"type": "textarea"},
  "tfoot": {"type": "tfoot"},
  "th": {"type": "th"},
  "thead": {"type": "thead"},
  "time": {"type": "time"},
  "title": {"type": "title"},
  "tr": {"type": "tr"},
  "track": {"type": "track"},
  "u": {"type": "u"},
  "ul": {"type": "ul"},
  "var": {"type": "var"},
  "video": {"type": "video"},
  "wbr": {"type": "wbr"}
});
