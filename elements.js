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

  static #setElementAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
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
      template = {"element": template};
    }

    const element = document.createElement(template.element);
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
  "a": {"element": "a"},
  "abbr": {"element": "abbr"},
  "address": {"element": "address"},
  "area": {"element": "area"},
  "article": {"element": "article"},
  "aside": {"element": "aside"},
  "audio": {"element": "audio"},
  "b": {"element": "b"},
  "base": {"element": "base"},
  "bdi": {"element": "bdi"},
  "bdo": {"element": "bdo"},
  "blockquote": {"element": "blockquote"},
  "body": {"element": "body"},
  "br": {"element": "br"},
  "button": {"element": "button"},
  "canvas": {"element": "canvas"},
  "caption": {"element": "caption"},
  "cite": {"element": "cite"},
  "code": {"element": "code"},
  "col": {"element": "col"},
  "colgroup": {"element": "colgroup"},
  "data": {"element": "data"},
  "datalist": {"element": "datalist"},
  "dd": {"element": "dd"},
  "del": {"element": "del"},
  "details": {"element": "details"},
  "dfn": {"element": "dfn"},
  "dialog": {"element": "dialog"},
  "div": {"element": "div"},
  "dl": {"element": "dl"},
  "dt": {"element": "dt"},
  "em": {"element": "em"},
  "embed": {"element": "embed"},
  "fieldset": {"element": "fieldset"},
  "figcaption": {"element": "figcaption"},
  "figure": {"element": "figure"},
  "footer": {"element": "footer"},
  "form": {"element": "form"},
  "h1": {"element": "h1"},
  "h2": {"element": "h2"},
  "h3": {"element": "h3"},
  "h4": {"element": "h4"},
  "h5": {"element": "h5"},
  "h6": {"element": "h6"},
  "head": {"element": "head"},
  "header": {"element": "header"},
  "hr": {"element": "hr"},
  "html": {"element": "html"},
  "i": {"element": "i"},
  "iframe": {"element": "iframe"},
  "img": {"element": "img"},
  "input": {"element": "input"},
  "ins": {"element": "ins"},
  "kbd": {"element": "kbd"},
  "label": {"element": "label"},
  "legend": {"element": "legend"},
  "li": {"element": "li"},
  "link": {"element": "link"},
  "main": {"element": "main"},
  "map": {"element": "map"},
  "mark": {"element": "mark"},
  "meta": {"element": "meta"},
  "meter": {"element": "meter"},
  "nav": {"element": "nav"},
  "noscript": {"element": "noscript"},
  "object": {"element": "object"},
  "ol": {"element": "ol"},
  "optgroup": {"element": "optgroup"},
  "option": {"element": "option"},
  "output": {"element": "output"},
  "p": {"element": "p"},
  "param": {"element": "param"},
  "picture": {"element": "picture"},
  "pre": {"element": "pre"},
  "progress": {"element": "progress"},
  "q": {"element": "q"},
  "rp": {"element": "rp"},
  "rt": {"element": "rt"},
  "ruby": {"element": "ruby"},
  "s": {"element": "s"},
  "samp": {"element": "samp"},
  "script": {"element": "script"},
  "section": {"element": "section"},
  "select": {"element": "select"},
  "small": {"element": "small"},
  "source": {"element": "source"},
  "span": {"element": "span"},
  "strong": {"element": "strong"},
  "style": {"element": "style"},
  "sub": {"element": "sub"},
  "summary": {"element": "summary"},
  "sup": {"element": "sup"},
  "table": {"element": "table"},
  "tbody": {"element": "tbody"},
  "td": {"element": "td"},
  "template": {"element": "template"},
  "textarea": {"element": "textarea"},
  "tfoot": {"element": "tfoot"},
  "th": {"element": "th"},
  "thead": {"element": "thead"},
  "time": {"element": "time"},
  "title": {"element": "title"},
  "tr": {"element": "tr"},
  "track": {"element": "track"},
  "u": {"element": "u"},
  "ul": {"element": "ul"},
  "var": {"element": "var"},
  "video": {"element": "video"},
  "wbr": {"element": "wbr"}
});
