class JSONElement {
  #newElement() {
    const element = this.template;

    const newElement = document.createElement(element.type);
    newElement['JSONTemplate'] = this.template;

    if (element.id) {
      newElement.setAttribute('id', element.id);
    }

    if (element.classes) {
      element.classes.forEach(function(thisClass) {
        newElement.classList.add(thisClass);
      });
    }

    if (element.styles) {
      for (const style in element.styles) {
        newElement.style[style] = element.styles[style];
      }
    }

    if (element.attributes) {
      for (const attribute in element.attributes) {
        newElement.setAttribute(attribute, element.attributes[attribute]);
      }
    }

    if (element.textContent) {
      newElement.appendChild(document.createTextNode(element.textContent));
    }

    if (element.innerHTML) {
      newElement.setHTML(element.innerHTML);
    }

    if (element.eventListeners) {
      element.eventListeners.forEach(function(listener) {
        for (const event in listener) {
          newElement.addEventListener(event, listener[event]);
        }
      });
    }

    if (element.childArray) {
      element.childArray.forEach(function(child) {
        newElement.appendChild(new JSONElement(child));
      });
    }

    if (element.childNodes) {
      element.childNodes.forEach(function(child) {
        newElement.appendChild(child);
      });
    }

    if (element.parentNode) {
      element.parentNode.appendChild(newElement);
    }

    return newElement;
  }

  constructor(element) {
    this.template = element;
    return this.create();
  }

  create() {
    return this.#newElement();
  }
}

/*
class ElementsJS {
  constructor() {
    this.create = function(element) {
      const newElement = document.createElement(element.type);

      if (element.id) {
        newElement.setAttribute('id', element.id);
      }

      if (element.classes) {
        element.classes.forEach(function(thisClass) {
          newElement.classList.add(thisClass);
        });
      }

      if (element.styles) {
        for (const style in element.styles) {
          newElement.style[style] = element.styles[style];
        }
      }

      if (element.attributes) {
        for (const attribute in element.attributes) {
          newElement.setAttribute(attribute, element.attributes[attribute]);
        }
      }

      if (element.textContent) {
        newElement.appendChild(document.createTextNode(element.textContent));
      }

      if (element.innerHTML) {
        newElement.setHTML(element.innerHTML);
      }

      if (element.eventListeners) {
        element.eventListeners.forEach(function(listener) {
          for (const event in listener) {
            newElement.addEventListener(event, listener[event]);
          }
        });
      }

      if (element.childArray) {
        element.childArray.forEach(function(child) {
          newElement.appendChild(this.create(child));
        });
      }

      if (element.childNodes) {
        element.childNodes.forEach(function(child) {
          newElement.appendChild(child);
        });
      }

      if (element.parentNode) {
        element.parentNode.appendChild(newElement);
      }

      return newElement;
    }

    this.createMany = function(elements, nodeMap=undefined) {
      */
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
     /*
      const elementsArray = [];
      elements.forEach(function(element) {
        elementsArray.push(this.create(element));
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
  }
}

const elementsJS = new ElementsJS();
*/