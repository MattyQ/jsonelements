"use strict";

class JSONElements {
  static #SYMBOL = Symbol("JSONElements");

  static #DEFAULT_ELEMENT_TEMPLATES = {
    "a": { "element": "a" },
    "abbr": { "element": "abbr" },
    "address": { "element": "address" },
    "area": { "element": "area", "void": true },
    "article": { "element": "article" },
    "aside": { "element": "aside" },
    "audio": { "element": "audio" },
    "b": { "element": "b" },
    "base": { "element": "base", "void": true },
    "bdi": { "element": "bdi" },
    "bdo": { "element": "bdo" },
    "blockquote": { "element": "blockquote" },
    "body": { "element": "body" },
    "br": { "element": "br", "void": true },
    "button": { "element": "button" },
    "canvas": { "element": "canvas" },
    "caption": { "element": "caption" },
    "cite": { "element": "cite" },
    "code": { "element": "code" },
    "col": { "element": "col", "void": true },
    "colgroup": { "element": "colgroup" },
    "data": { "element": "data" },
    "datalist": { "element": "datalist" },
    "dd": { "element": "dd" },
    "del": { "element": "del" },
    "details": { "element": "details" },
    "dfn": { "element": "dfn" },
    "dialog": { "element": "dialog" },
    "div": { "element": "div" },
    "dl": { "element": "dl" },
    "dt": { "element": "dt" },
    "em": { "element": "em" },
    "embed": { "element": "embed", "void": true },
    "fieldset": { "element": "fieldset" },
    "figcaption": { "element": "figcaption" },
    "figure": { "element": "figure" },
    "footer": { "element": "footer" },
    "form": { "element": "form" },
    "h1": { "element": "h1" },
    "h2": { "element": "h2" },
    "h3": { "element": "h3" },
    "h4": { "element": "h4" },
    "h5": { "element": "h5" },
    "h6": { "element": "h6" },
    "head": { "element": "head" },
    "header": { "element": "header" },
    "hr": { "element": "hr", "void": true },
    "html": { "element": "html" },
    "i": { "element": "i" },
    "iframe": { "element": "iframe" },
    "img": { "element": "img", "void": true },
    "input": { "element": "input", "void": true },
    "ins": { "element": "ins" },
    "kbd": { "element": "kbd" },
    "label": { "element": "label" },
    "legend": { "element": "legend" },
    "li": { "element": "li" },
    "link": { "element": "link", "void": true },
    "main": { "element": "main" },
    "map": { "element": "map" },
    "mark": { "element": "mark" },
    "meta": { "element": "meta", "void": true },
    "meter": { "element": "meter" },
    "nav": { "element": "nav" },
    "noscript": { "element": "noscript" },
    "object": { "element": "object" },
    "ol": { "element": "ol" },
    "optgroup": { "element": "optgroup" },
    "option": { "element": "option" },
    "output": { "element": "output" },
    "p": { "element": "p" },
    "param": { "element": "param" },
    "picture": { "element": "picture" },
    "pre": { "element": "pre" },
    "progress": { "element": "progress" },
    "q": { "element": "q" },
    "rp": { "element": "rp" },
    "rt": { "element": "rt" },
    "ruby": { "element": "ruby" },
    "s": { "element": "s" },
    "samp": { "element": "samp" },
    "script": { "element": "script" },
    "section": { "element": "section" },
    "select": { "element": "select" },
    "small": { "element": "small" },
    "source": { "element": "source", "void": true },
    "span": { "element": "span" },
    "strong": { "element": "strong" },
    "style": { "element": "style" },
    "sub": { "element": "sub" },
    "summary": { "element": "summary" },
    "sup": { "element": "sup" },
    "table": { "element": "table" },
    "tbody": { "element": "tbody" },
    "td": { "element": "td" },
    "template": { "element": "template" },
    "textarea": { "element": "textarea" },
    "tfoot": { "element": "tfoot" },
    "th": { "element": "th" },
    "thead": { "element": "thead" },
    "time": { "element": "time" },
    "title": { "element": "title" },
    "tr": { "element": "tr" },
    "track": { "element": "track", "void": true },
    "u": { "element": "u" },
    "ul": { "element": "ul" },
    "var": { "element": "var" },
    "video": { "element": "video" },
    "wbr": { "element": "wbr", "void": true }
  }

  static #setElementClasses(element, classes) {
    classes.forEach(function (thisClass) {
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
    eventListeners.forEach(function (listener) {
      for (const event in listener) {
        element.addEventListener(event, listener[event]);
      }
    });
  }

  static #setElementChildArray(element, childArray) {
    childArray.forEach(function (child) {
      element.appendChild(new JSONElement(child));
    });
  }

  static #setElementChildNodes(element, childNodes) {
    childNodes.forEach(function (child) {
      element.appendChild(child);
    });
  }

  static #setElementParentNode(element, parentNode) {
    parentNode.appendChild(element);
  }

  static #newElement(template) {
    if (typeof template === "string") {
      template = { "element": template };
    }

    let element = undefined;

    if (template["element"] instanceof Element) {
      element = template["element"];
    } else {
      element = document.createElement(template["element"]);
    }

    element[this["key"]] = template;

    if (template["classes"]) {
      this.#setElementClasses(element, template["classes"]);
    }

    if (template["styles"]) {
      this.#setElementStyles(element, template["styles"]);
    }

    if (template["attributes"]) {
      this.#setElementAttributes(element, template["attributes"]);
    }

    if (template["accept"]) {
      this.#setElementAttribute(element, "accept", template["accept"]);
    }

    if (template["accept-charset"]) {
      this.#setElementAttribute(element, "accept-charset", template["accept-charset"]);
    }

    if (template["accesskey"]) {
      this.#setElementAttribute(element, "accesskey", template["accesskey"]);
    }

    if (template["action"]) {
      this.#setElementAttribute(element, "action", template["action"]);
    }

    if (template["align"]) {
      this.#setElementAttribute(element, "align", template["align"]);
    }

    if (template["alt"]) {
      this.#setElementAttribute(element, "alt", template["alt"]);
    }

    if (template["aria-activedescendant"]) {
      this.#setElementAttribute(element, "aria-activedescendant", template["aria-activedescendant"]);
    }

    if (template["aria-atomic"]) {
      this.#setElementAttribute(element, "aria-atomic", template["aria-atomic"]);
    }

    if (template["aria-autocomplete"]) {
      this.#setElementAttribute(element, "aria-autocomplete", template["aria-autocomplete"]);
    }

    if (template["aria-busy"]) {
      this.#setElementAttribute(element, "aria-busy", template["aria-busy"]);
    }

    if (template["aria-checked"]) {
      this.#setElementAttribute(element, "aria-checked", template["aria-checked"]);
    }

    if (template["aria-colcount"]) {
      this.#setElementAttribute(element, "aria-colcount", template["aria-colcount"]);
    }

    if (template["aria-colindex"]) {
      this.#setElementAttribute(element, "aria-colindex", template["aria-colindex"]);
    }

    if (template["aria-colspan"]) {
      this.#setElementAttribute(element, "aria-colspan", template["aria-colspan"]);
    }

    if (template["aria-controls"]) {
      this.#setElementAttribute(element, "aria-controls", template["aria-controls"]);
    }

    if (template["aria-current"]) {
      this.#setElementAttribute(element, "aria-current", template["aria-current"]);
    }

    if (template["aria-describedby"]) {
      this.#setElementAttribute(element, "aria-describedby", template["aria-describedby"]);
    }

    if (template["aria-description"]) {
      this.#setElementAttribute(element, "aria-description", template["aria-description"]);
    }

    if (template["aria-details"]) {
      this.#setElementAttribute(element, "aria-details", template["aria-details"]);
    }

    if (template["aria-disabled"]) {
      this.#setElementAttribute(element, "aria-disabled", template["aria-disabled"]);
    }

    if (template["aria-dropeffect"]) {
      this.#setElementAttribute(element, "aria-dropeffect", template["aria-dropeffect"]);
    }

    if (template["aria-errormessage"]) {
      this.#setElementAttribute(element, "aria-errormessage", template["aria-errormessage"]);
    }

    if (template["aria-expanded"]) {
      this.#setElementAttribute(element, "aria-expanded", template["aria-expanded"]);
    }

    if (template["aria-flowto"]) {
      this.#setElementAttribute(element, "aria-flowto", template["aria-flowto"]);
    }

    if (template["aria-grabbed"]) {
      this.#setElementAttribute(element, "aria-grabbed", template["aria-grabbed"]);
    }

    if (template["aria-haspopup"]) {
      this.#setElementAttribute(element, "aria-haspopup", template["aria-haspopup"]);
    }

    if (template["aria-hidden"]) {
      this.#setElementAttribute(element, "aria-hidden", template["aria-hidden"]);
    }

    if (template["aria-invalid"]) {
      this.#setElementAttribute(element, "aria-invalid", template["aria-invalid"]);
    }

    if (template["aria-keyshortcuts"]) {
      this.#setElementAttribute(element, "aria-keyshortcuts", template["aria-keyshortcuts"]);
    }

    if (template["aria-label"]) {
      this.#setElementAttribute(element, "aria-label", template["aria-label"]);
    }

    if (template["aria-labelledby"]) {
      this.#setElementAttribute(element, "aria-labelledby", template["aria-labelledby"]);
    }

    if (template["aria-level"]) {
      this.#setElementAttribute(element, "aria-level", template["aria-level"]);
    }

    if (template["aria-live"]) {
      this.#setElementAttribute(element, "aria-live", template["aria-live"]);
    }

    if (template["aria-modal"]) {
      this.#setElementAttribute(element, "aria-modal", template["aria-modal"]);
    }

    if (template["aria-multiline"]) {
      this.#setElementAttribute(element, "aria-multiline", template["aria-multiline"]);
    }

    if (template["aria-multiselectable"]) {
      this.#setElementAttribute(element, "aria-multiselectable", template["aria-multiselectable"]);
    }

    if (template["aria-orientation"]) {
      this.#setElementAttribute(element, "aria-orientation", template["aria-orientation"]);
    }

    if (template["aria-owns"]) {
      this.#setElementAttribute(element, "aria-owns", template["aria-owns"]);
    }

    if (template["aria-placeholder"]) {
      this.#setElementAttribute(element, "aria-placeholder", template["aria-placeholder"]);
    }

    if (template["aria-posinset"]) {
      this.#setElementAttribute(element, "aria-posinset", template["aria-posinset"]);
    }

    if (template["aria-pressed"]) {
      this.#setElementAttribute(element, "aria-pressed", template["aria-pressed"]);
    }

    if (template["aria-readonly"]) {
      this.#setElementAttribute(element, "aria-readonly", template["aria-readonly"]);
    }

    if (template["aria-relevant"]) {
      this.#setElementAttribute(element, "aria-relevant", template["aria-relevant"]);
    }

    if (template["aria-required"]) {
      this.#setElementAttribute(element, "aria-required", template["aria-required"]);
    }

    if (template["aria-roledescription"]) {
      this.#setElementAttribute(element, "aria-roledescription", template["aria-roledescription"]);
    }

    if (template["aria-rowcount"]) {
      this.#setElementAttribute(element, "aria-rowcount", template["aria-rowcount"]);
    }

    if (template["aria-rowindex"]) {
      this.#setElementAttribute(element, "aria-rowindex", template["aria-rowindex"]);
    }

    if (template["aria-rowspan"]) {
      this.#setElementAttribute(element, "aria-rowspan", template["aria-rowspan"]);
    }

    if (template["aria-selected"]) {
      this.#setElementAttribute(element, "aria-selected", template["aria-selected"]);
    }

    if (template["aria-setsize"]) {
      this.#setElementAttribute(element, "aria-setsize", template["aria-setsize"]);
    }

    if (template["aria-sort"]) {
      this.#setElementAttribute(element, "aria-sort", template["aria-sort"]);
    }

    if (template["aria-valuemax"]) {
      this.#setElementAttribute(element, "aria-valuemax", template["aria-valuemax"]);
    }

    if (template["aria-valuemin"]) {
      this.#setElementAttribute(element, "aria-valuemin", template["aria-valuemin"]);
    }

    if (template["aria-valuenow"]) {
      this.#setElementAttribute(element, "aria-valuenow", template["aria-valuenow"]);
    }

    if (template["aria-valuetext"]) {
      this.#setElementAttribute(element, "aria-valuetext", template["aria-valuetext"]);
    }

    if (template["async"]) {
      this.#setElementAttribute(element, "async", template["async"]);
    }

    if (template["autocomplete"]) {
      this.#setElementAttribute(element, "autocomplete", template["autocomplete"]);
    }

    if (template["autofocus"]) {
      this.#setElementAttribute(element, "autofocus", template["autofocus"]);
    }

    if (template["autoplay"]) {
      this.#setElementAttribute(element, "autoplay", template["autoplay"]);
    }

    if (template["bgcolor"]) {
      this.#setElementAttribute(element, "bgcolor", template["bgcolor"]);
    }

    if (template["border"]) {
      this.#setElementAttribute(element, "border", template["border"]);
    }

    if (template["charset"]) {
      this.#setElementAttribute(element, "charset", template["charset"]);
    }

    if (template["checked"]) {
      this.#setElementAttribute(element, "checked", template["checked"]);
    }

    if (template["cite"]) {
      this.#setElementAttribute(element, "cite", template["cite"]);
    }

    if (template["class"]) {
      this.#setElementAttribute(element, "class", template["class"]);
    }

    if (template["color"]) {
      this.#setElementAttribute(element, "color", template["color"]);
    }

    if (template["cols"]) {
      this.#setElementAttribute(element, "cols", template["cols"]);
    }

    if (template["colspan"]) {
      this.#setElementAttribute(element, "colspan", template["colspan"]);
    }

    if (template["content"]) {
      this.#setElementAttribute(element, "content", template["content"]);
    }

    if (template["contenteditable"]) {
      this.#setElementAttribute(element, "contenteditable", template["contenteditable"]);
    }

    if (template["controls"]) {
      this.#setElementAttribute(element, "controls", template["controls"]);
    }

    if (template["coords"]) {
      this.#setElementAttribute(element, "coords", template["coords"]);
    }

    if (template["data"]) {
      this.#setElementAttribute(element, "data", template["data"]);
    }

    if (template["datetime"]) {
      this.#setElementAttribute(element, "datetime", template["datetime"]);
    }

    if (template["default"]) {
      this.#setElementAttribute(element, "default", template["default"]);
    }

    if (template["defer"]) {
      this.#setElementAttribute(element, "defer", template["defer"]);
    }

    if (template["dir"]) {
      this.#setElementAttribute(element, "dir", template["dir"]);
    }

    if (template["dirname"]) {
      this.#setElementAttribute(element, "dirname", template["dirname"]);
    }

    if (template["disabled"]) {
      this.#setElementAttribute(element, "disabled", template["disabled"]);
    }

    if (template["download"]) {
      this.#setElementAttribute(element, "download", template["download"]);
    }

    if (template["draggable"]) {
      this.#setElementAttribute(element, "draggable", template["draggable"]);
    }

    if (template["enctype"]) {
      this.#setElementAttribute(element, "enctype", template["enctype"]);
    }

    if (template["for"]) {
      this.#setElementAttribute(element, "for", template["for"]);
    }

    if (template["form"]) {
      this.#setElementAttribute(element, "form", template["form"]);
    }

    if (template["formaction"]) {
      this.#setElementAttribute(element, "formaction", template["formaction"]);
    }

    if (template["headers"]) {
      this.#setElementAttribute(element, "headers", template["headers"]);
    }

    if (template["height"]) {
      this.#setElementAttribute(element, "height", template["height"]);
    }

    if (template["hidden"]) {
      this.#setElementAttribute(element, "hidden", template["hidden"]);
    }

    if (template["high"]) {
      this.#setElementAttribute(element, "high", template["high"]);
    }

    if (template["href"]) {
      this.#setElementAttribute(element, "href", template["href"]);
    }

    if (template["hreflang"]) {
      this.#setElementAttribute(element, "hreflang", template["hreflang"]);
    }

    if (template["http-equiv"]) {
      this.#setElementAttribute(element, "http-equiv", template["http-equiv"]);
    }

    if (template["id"]) {
      this.#setElementAttribute(element, "id", template["id"]);
    }

    if (template["ismap"]) {
      this.#setElementAttribute(element, "ismap", template["ismap"]);
    }

    if (template["kind"]) {
      this.#setElementAttribute(element, "kind", template["kind"]);
    }

    if (template["label"]) {
      this.#setElementAttribute(element, "label", template["label"]);
    }

    if (template["lang"]) {
      this.#setElementAttribute(element, "lang", template["lang"]);
    }

    if (template["list"]) {
      this.#setElementAttribute(element, "list", template["list"]);
    }

    if (template["loop"]) {
      this.#setElementAttribute(element, "loop", template["loop"]);
    }

    if (template["low"]) {
      this.#setElementAttribute(element, "low", template["low"]);
    }

    if (template["max"]) {
      this.#setElementAttribute(element, "max", template["max"]);
    }

    if (template["maxlength"]) {
      this.#setElementAttribute(element, "maxlength", template["maxlength"]);
    }

    if (template["media"]) {
      this.#setElementAttribute(element, "media", template["media"]);
    }

    if (template["method"]) {
      this.#setElementAttribute(element, "method", template["method"]);
    }

    if (template["min"]) {
      this.#setElementAttribute(element, "min", template["min"]);
    }

    if (template["multiple"]) {
      this.#setElementAttribute(element, "multiple", template["multiple"]);
    }

    if (template["muted"]) {
      this.#setElementAttribute(element, "muted", template["muted"]);
    }

    if (template["name"]) {
      this.#setElementAttribute(element, "name", template["name"]);
    }

    if (template["novalidate"]) {
      this.#setElementAttribute(element, "novalidate", template["novalidate"]);
    }

    if (template["onabort"]) {
      this.#setElementAttribute(element, "onabort", template["onabort"]);
    }

    if (template["onafterprint"]) {
      this.#setElementAttribute(element, "onafterprint", template["onafterprint"]);
    }

    if (template["onbeforeprint"]) {
      this.#setElementAttribute(element, "onbeforeprint", template["onbeforeprint"]);
    }

    if (template["onbeforeunload"]) {
      this.#setElementAttribute(element, "onbeforeunload", template["onbeforeunload"]);
    }

    if (template["onblur"]) {
      this.#setElementAttribute(element, "onblur", template["onblur"]);
    }

    if (template["oncanplay"]) {
      this.#setElementAttribute(element, "oncanplay", template["oncanplay"]);
    }

    if (template["oncanplaythrough"]) {
      this.#setElementAttribute(element, "oncanplaythrough", template["oncanplaythrough"]);
    }

    if (template["onchange"]) {
      this.#setElementAttribute(element, "onchange", template["onchange"]);
    }

    if (template["onclick"]) {
      this.#setElementAttribute(element, "onclick", template["onclick"]);
    }

    if (template["oncontextmenu"]) {
      this.#setElementAttribute(element, "oncontextmenu", template["oncontextmenu"]);
    }

    if (template["oncopy"]) {
      this.#setElementAttribute(element, "oncopy", template["oncopy"]);
    }

    if (template["oncuechange"]) {
      this.#setElementAttribute(element, "oncuechange", template["oncuechange"]);
    }

    if (template["oncut"]) {
      this.#setElementAttribute(element, "oncut", template["oncut"]);
    }

    if (template["ondblclick"]) {
      this.#setElementAttribute(element, "ondblclick", template["ondblclick"]);
    }

    if (template["ondrag"]) {
      this.#setElementAttribute(element, "ondrag", template["ondrag"]);
    }

    if (template["ondragend"]) {
      this.#setElementAttribute(element, "ondragend", template["ondragend"]);
    }

    if (template["ondragenter"]) {
      this.#setElementAttribute(element, "ondragenter", template["ondragenter"]);
    }

    if (template["ondragleave"]) {
      this.#setElementAttribute(element, "ondragleave", template["ondragleave"]);
    }

    if (template["ondragover"]) {
      this.#setElementAttribute(element, "ondragover", template["ondragover"]);
    }

    if (template["ondragstart"]) {
      this.#setElementAttribute(element, "ondragstart", template["ondragstart"]);
    }

    if (template["ondrop"]) {
      this.#setElementAttribute(element, "ondrop", template["ondrop"]);
    }

    if (template["ondurationchange"]) {
      this.#setElementAttribute(element, "ondurationchange", template["ondurationchange"]);
    }

    if (template["onemptied"]) {
      this.#setElementAttribute(element, "onemptied", template["onemptied"]);
    }

    if (template["onended"]) {
      this.#setElementAttribute(element, "onended", template["onended"]);
    }

    if (template["onerror"]) {
      this.#setElementAttribute(element, "onerror", template["onerror"]);
    }

    if (template["onfocus"]) {
      this.#setElementAttribute(element, "onfocus", template["onfocus"]);
    }

    if (template["onhashchange"]) {
      this.#setElementAttribute(element, "onhashchange", template["onhashchange"]);
    }

    if (template["oninput"]) {
      this.#setElementAttribute(element, "oninput", template["oninput"]);
    }

    if (template["oninvalid"]) {
      this.#setElementAttribute(element, "oninvalid", template["oninvalid"]);
    }

    if (template["onkeydown"]) {
      this.#setElementAttribute(element, "onkeydown", template["onkeydown"]);
    }

    if (template["onkeypress"]) {
      this.#setElementAttribute(element, "onkeypress", template["onkeypress"]);
    }

    if (template["onkeyup"]) {
      this.#setElementAttribute(element, "onkeyup", template["onkeyup"]);
    }

    if (template["onload"]) {
      this.#setElementAttribute(element, "onload", template["onload"]);
    }

    if (template["onloadeddata"]) {
      this.#setElementAttribute(element, "onloadeddata", template["onloadeddata"]);
    }

    if (template["onloadedmetadata"]) {
      this.#setElementAttribute(element, "onloadedmetadata", template["onloadedmetadata"]);
    }

    if (template["onloadstart"]) {
      this.#setElementAttribute(element, "onloadstart", template["onloadstart"]);
    }

    if (template["onmousedown"]) {
      this.#setElementAttribute(element, "onmousedown", template["onmousedown"]);
    }

    if (template["onmousemove"]) {
      this.#setElementAttribute(element, "onmousemove", template["onmousemove"]);
    }

    if (template["onmouseout"]) {
      this.#setElementAttribute(element, "onmouseout", template["onmouseout"]);
    }

    if (template["onmouseover"]) {
      this.#setElementAttribute(element, "onmouseover", template["onmouseover"]);
    }

    if (template["onmouseup"]) {
      this.#setElementAttribute(element, "onmouseup", template["onmouseup"]);
    }

    if (template["onoffline"]) {
      this.#setElementAttribute(element, "onoffline", template["onoffline"]);
    }

    if (template["ononline"]) {
      this.#setElementAttribute(element, "ononline", template["ononline"]);
    }

    if (template["onpagehide"]) {
      this.#setElementAttribute(element, "onpagehide", template["onpagehide"]);
    }

    if (template["onpageshow"]) {
      this.#setElementAttribute(element, "onpageshow", template["onpageshow"]);
    }

    if (template["onpaste"]) {
      this.#setElementAttribute(element, "onpaste", template["onpaste"]);
    }

    if (template["onpause"]) {
      this.#setElementAttribute(element, "onpause", template["onpause"]);
    }

    if (template["onplay"]) {
      this.#setElementAttribute(element, "onplay", template["onplay"]);
    }

    if (template["onplaying"]) {
      this.#setElementAttribute(element, "onplaying", template["onplaying"]);
    }

    if (template["onpopstate"]) {
      this.#setElementAttribute(element, "onpopstate", template["onpopstate"]);
    }

    if (template["onprogress"]) {
      this.#setElementAttribute(element, "onprogress", template["onprogress"]);
    }

    if (template["onratechange"]) {
      this.#setElementAttribute(element, "onratechange", template["onratechange"]);
    }

    if (template["onreset"]) {
      this.#setElementAttribute(element, "onreset", template["onreset"]);
    }

    if (template["onresize"]) {
      this.#setElementAttribute(element, "onresize", template["onresize"]);
    }

    if (template["onscroll"]) {
      this.#setElementAttribute(element, "onscroll", template["onscroll"]);
    }

    if (template["onsearch"]) {
      this.#setElementAttribute(element, "onsearch", template["onsearch"]);
    }

    if (template["onseeked"]) {
      this.#setElementAttribute(element, "onseeked", template["onseeked"]);
    }

    if (template["onseeking"]) {
      this.#setElementAttribute(element, "onseeking", template["onseeking"]);
    }

    if (template["onselect"]) {
      this.#setElementAttribute(element, "onselect", template["onselect"]);
    }

    if (template["onstalled"]) {
      this.#setElementAttribute(element, "onstalled", template["onstalled"]);
    }

    if (template["onstorage"]) {
      this.#setElementAttribute(element, "onstorage", template["onstorage"]);
    }

    if (template["onsubmit"]) {
      this.#setElementAttribute(element, "onsubmit", template["onsubmit"]);
    }

    if (template["onsuspend"]) {
      this.#setElementAttribute(element, "onsuspend", template["onsuspend"]);
    }

    if (template["ontimeupdate"]) {
      this.#setElementAttribute(element, "ontimeupdate", template["ontimeupdate"]);
    }

    if (template["ontoggle"]) {
      this.#setElementAttribute(element, "ontoggle", template["ontoggle"]);
    }

    if (template["onunload"]) {
      this.#setElementAttribute(element, "onunload", template["onunload"]);
    }

    if (template["onvolumechange"]) {
      this.#setElementAttribute(element, "onvolumechange", template["onvolumechange"]);
    }

    if (template["onwaiting"]) {
      this.#setElementAttribute(element, "onwaiting", template["onwaiting"]);
    }

    if (template["onwheel"]) {
      this.#setElementAttribute(element, "onwheel", template["onwheel"]);
    }

    if (template["open"]) {
      this.#setElementAttribute(element, "open", template["open"]);
    }

    if (template["optimum"]) {
      this.#setElementAttribute(element, "optimum", template["optimum"]);
    }

    if (template["pattern"]) {
      this.#setElementAttribute(element, "pattern", template["pattern"]);
    }

    if (template["placeholder"]) {
      this.#setElementAttribute(element, "placeholder", template["placeholder"]);
    }

    if (template["poster"]) {
      this.#setElementAttribute(element, "poster", template["poster"]);
    }

    if (template["preload"]) {
      this.#setElementAttribute(element, "preload", template["preload"]);
    }

    if (template["readonly"]) {
      this.#setElementAttribute(element, "readonly", template["readonly"]);
    }

    if (template["rel"]) {
      this.#setElementAttribute(element, "rel", template["rel"]);
    }

    if (template["required"]) {
      this.#setElementAttribute(element, "required", template["required"]);
    }

    if (template["reversed"]) {
      this.#setElementAttribute(element, "reversed", template["reversed"]);
    }

    if (template["rows"]) {
      this.#setElementAttribute(element, "rows", template["rows"]);
    }

    if (template["rowspan"]) {
      this.#setElementAttribute(element, "rowspan", template["rowspan"]);
    }

    if (template["sandbox"]) {
      this.#setElementAttribute(element, "sandbox", template["sandbox"]);
    }

    if (template["scope"]) {
      this.#setElementAttribute(element, "scope", template["scope"]);
    }

    if (template["selected"]) {
      this.#setElementAttribute(element, "selected", template["selected"]);
    }

    if (template["shape"]) {
      this.#setElementAttribute(element, "shape", template["shape"]);
    }

    if (template["size"]) {
      this.#setElementAttribute(element, "size", template["size"]);
    }

    if (template["sizes"]) {
      this.#setElementAttribute(element, "sizes", template["sizes"]);
    }

    if (template["span"]) {
      this.#setElementAttribute(element, "span", template["span"]);
    }

    if (template["spellcheck"]) {
      this.#setElementAttribute(element, "spellcheck", template["spellcheck"]);
    }

    if (template["src"]) {
      this.#setElementAttribute(element, "src", template["src"]);
    }

    if (template["srcdoc"]) {
      this.#setElementAttribute(element, "srcdoc", template["srcdoc"]);
    }

    if (template["srclang"]) {
      this.#setElementAttribute(element, "srclang", template["srclang"]);
    }

    if (template["srcset"]) {
      this.#setElementAttribute(element, "srcset", template["srcset"]);
    }

    if (template["start"]) {
      this.#setElementAttribute(element, "start", template["start"]);
    }

    if (template["step"]) {
      this.#setElementAttribute(element, "step", template["step"]);
    }

    if (template["style"]) {
      this.#setElementAttribute(element, "style", template["style"]);
    }

    if (template["tabindex"]) {
      this.#setElementAttribute(element, "tabindex", template["tabindex"]);
    }

    if (template["target"]) {
      this.#setElementAttribute(element, "target", template["target"]);
    }

    if (template["title"]) {
      this.#setElementAttribute(element, "title", template["title"]);
    }

    if (template["translate"]) {
      this.#setElementAttribute(element, "translate", template["translate"]);
    }

    if (template["type"]) {
      this.#setElementAttribute(element, "type", template["type"]);
    }

    if (template["usemap"]) {
      this.#setElementAttribute(element, "usemap", template["usemap"]);
    }

    if (template["value"]) {
      this.#setElementAttribute(element, "value", template["value"]);
    }

    if (template["width"]) {
      this.#setElementAttribute(element, "width", template["width"]);
    }

    if (template["wrap"]) {
      this.#setElementAttribute(element, "wrap", template["wrap"]);
    }

    if (template["textContent"]) {
      this.#setElementTextContent(element, template["textContent"]);
    }

    if (template["innerHTML"]) {
      this.#setElementInnerHTML(element, template["innerHTML"]);
    }

    if (template["eventListeners"]) {
      this.#setElementEventListeners(element, template["eventListeners"]);
    }

    if (template["childArray"]) {
      this.#setElementChildArray(element, template["childArray"]);
    }

    if (template["childNodes"]) {
      this.#setElementChildNodes(element, template["childNodes"]);
    }

    if (template["parentNode"]) {
      this.#setElementParentNode(element, template["parentNode"]);
    }

    return element;
  }

  static #buildElementsArray(elements) {
    const elementsArray = [];

    elements.forEach(function (element) {
      elementsArray.push(new JSONElement(element));
    });

    return elementsArray;
  }

  static #applyNodeMap(elementsArray, nodeMap) {
    nodeMap.forEach(function (map) {
      for (const parent in map) {
        map[parent].forEach(function (child) {
          elementsArray[parent].appendChild(elementsArray[child]);
        });
      }
    });
  }

  static #newElements(elements, nodeMap = undefined) {
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

  static #parseTemplateString(templateStringArray, elementOverride = undefined) {
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

    if (stringsArray) {
      for (let i = stringsArray.length; i > 0; i--) {
        element.appendChild(JSONElements.text(stringsArray.shift()));

        if (elementsArray.length > 0) {
          element.appendChild(elementsArray.shift());
        }
      }
    }

    return element;
  }

  static #Shortcuts = class {
    constructor(templates = undefined) {
      const _e = function () {
        return JSONElements.#parseTemplateString([...arguments]);
      }

      if (templates) {
        for (const [name, template] of Object.entries(templates)) {
          if (template["void"]) {
            _e[name] = new JSONElement(template);
          } else {
            _e[name] = function () {
              return JSONElements.#parseTemplateString([...arguments], template);
            }
          }

          _e[name][JSONElements.key] = template;
        }

        _e[JSONElements.key] = templates;
      }

      return _e;
    }
  }

  static #Links = class {
    constructor(links) {
      const defaultTemplate = { "element": "a" };
      const linkTemplates = {};

      for (const [name, template] of Object.entries(links)) {
        if (typeof template === "string") {
          linkTemplates[name] = JSONElements.#mergeTemplates(defaultTemplate, { "href": template });
        } else if (typeof template === "object") {
          linkTemplates[name] = JSONElements.#mergeTemplates(defaultTemplate, template);
        }
      }

      return new JSONElements(linkTemplates);
    }
  }

  static #Images = class {
    constructor(images) {
      const defaultTemplate = { "element": "img", "void": true };

      const imageTemplates = {};

      for (const [name, template] of Object.entries(images)) {
        if (typeof template === "string") {
          imageTemplates[name] = JSONElements.#mergeTemplates(defaultTemplate, { "src": template });
        } else if (typeof template === "object") {
          imageTemplates[name] = JSONElements.#mergeTemplates(defaultTemplate, template);
        }
      }

      return new JSONElements(imageTemplates);
    }
  }

  constructor(templates = undefined) {
    return new JSONElements.#Shortcuts(templates);
  }

  static get key() {
    return JSONElements.#SYMBOL;
  }

  static get defaultElements() {
    return JSONElements.#DEFAULT_ELEMENT_TEMPLATES;
  }

  static create(element) {
    return this.#newElement(element);
  }

  static createMany(elements, nodeMap = undefined) {
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

  static links(links) {
    return new JSONElements.#Links(links);
  }

  static images(images) {
    return new JSONElements.#Images(images);
  }
}

class JSONElement {
  constructor(element) {
    if (JSONElements.isJSONElement(element)) {
      return JSONElements.create(JSONElements.getJSONtemplate(element));
    } else if (element instanceof Element || typeof element === "object" || typeof element === "string") {
      return JSONElements.create(element);
    } else {
      throw new Error("JSONElement requires a valid string for document.createElement(), an object that follows the JSONElement schema, or an element created with the elements.js library.")
    }
  }
}

const _e = new JSONElements(JSONElements.defaultElements);
