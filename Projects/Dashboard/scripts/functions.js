function createElement(element, container, attributes, properties) {
    if (container != null) {
        var elementContainer = document.createElement(container);
    }

    var el = document.createElement(element);

    for (var attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }

    for (var property in properties) {
        el[property] = properties[property];
    }

    if (container != null) {
        elementContainer.appendChild(el);
        return elementContainer;
    }

    return el;
}

function createElementFromObject(data, value) {
    data["container"] = data["container"] || null;
    data["element"] = data["element"] || "span";
    data["attributes"] = data["attributes"] || {};
    data["properties"] = data["properties"] || {};
    if (value) {
        data["properties"]["textContent"] = value;
    }

    return createElement(data["element"], data["container"], data["attributes"], data["properties"]);
}

function printItemProperties(item, properties, parentElement) {
    for (var prop in properties) {
        var type = properties[prop]["type"];
        var attribute = properties[prop]['value'];
        var printData = properties[prop]['element'];

        var element = createElementFromObject(printData, item[attribute]);
        if (type === "primitive") {
            parentElement.appendChild(element);
        } else if (type === "array") {
            var grandFather = printData["container"] ? element.children[0] : element;

            for (var i = 0; i < item[prop].length; i++) {

                var newParent = createElementFromObject(properties[prop]['separator']);
                printItemProperties(item[prop][i], attribute, newParent.children[0]);
                grandFather.appendChild(newParent);

            }

            parentElement.appendChild(element);
        } else if (type === "object") {
            var newParent = printData["container"] ? element.children[0] : element;
            printItemProperties(item[prop], attribute, newParent);
            parentElement.appendChild(element)
        }
    }
}