/**
 * Composes multiple functions together
 * @param  {...[Function]} fns The functions you want to compose
 * @return {Function} The new composed function
 */
function compose(...fns) {
  return fns.reduce((f, g) => (...args) => f(g(...args)));
}

/**
 * Gets the text of a layer
 * @param  {Layer} layer The layer
 * @return {String} The text of a layer
 */
function getText(layer) {
  if (!layer.isText) return '';

  return layer.text;
}

/**
 * Creates an NSAlert with text and buttons
 * @param  {String}        options.text    The alert text
 * @param  {Array<String>} options.buttons An array with button texts
 * @return {NSAlert} The NSAlert object
 */
function createAlert({ text, buttons = [] }) {
  var alert = NSAlert.alloc().init();

  alert.messageText = text;

  for (var i = 0; i < buttons.length; i++) {
    alert.addButtonWithTitle(buttons[i]);
  }

  return alert;
}

/**
 * Slugifies a string
 * @param  {String} string The string you want to slugify
 * @return {String} The slugified string
 */
function slugify(string) {
  return string.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '_')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * @param  {Any} val
 * @return {Boolean} Whether the value is thruthy
 */
function isTruthy(val) {
  return !!val;
}

/**
 * Creates a new array without any duplicates
 * @param  {Array} array The array to filter
 * @return {Array} A new array with the duplicates filtered out
 */
function removeDuplicates(array) {
  var pastStrings = [];

  return array.filter(function(item) {
    if (pastStrings.indexOf(item) > -1) return false;

    pastStrings.push(item);
    return true;
  });
}

/**
 * Creates a map function for a seperator
 * @param  {Function} func The function you want to call on each iteration
 * @return {Function} The map function that takes a selection and creates
 *                    a new array using the supplied function
 */
function createSelectionMap(func) {
  return function map(selection) {
    var arr = [];

    selection.iterate(function addItemToArray(item) {
      arr.push(func(item));
    });

    return arr;
  }
}

/**
 * Creates a join function that takes a string and seperates it by the specified
 * seperator.
 * @param  {String} separator Specifies a string to separate each element of the array.
 * @return {Function} The function that takes an array and joins them using the seperator
 */
function join(separator) {
  return function(array) {
    return array.join(separator);
  }
}

/**
 * Creates a function that calls .stringByTrimmingCharactersInSet on an NSString
 */
function stringByTrimmingCharactersInSet(characterSet) {
  return function(nsString) {
    return nsString.stringByTrimmingCharactersInSet(characterSet);
  }
}

/**
 * Checks if the selection has a layer that is text
 * @param  {Selection} selection The selection
 * @return {Boolean} Whether the selection has any text layers
 */
function hasTextLayer(selection) {
  var found = false;

  // TODO: Find a way to iterate over a selection and break out of the iteration.
  // Right now this method is very inefficient, because it should stop
  // the iteration when the first layer has text.
  selection.iterate(function(layer) {
    if (layer.isText) {
      found = true;
    }
  });

  return found;
}
