@import './utils.js';

var FILETYPE = 'csv';

function saveToFile({ filenamePrefix, content: string }) {
  // Configuring save panel
  var savePanel = NSSavePanel.savePanel();
  savePanel.allowedFileTypes = [FILETYPE];
  savePanel.nameFieldStringValue = `${filenamePrefix}_strings`;

  // Launching alert
  var result = savePanel.runModal();
  if (result == NSFileHandlingPanelOKButton) {
    var path = savePanel.URL().path();
    var success = string.writeToFile_atomically_encoding_error(path, true, NSUTF8StringEncoding, null);
    var alert;

    if (success) {
      alert = createAlert({
        text: 'The ' + FILETYPE.toUpperCase() + '-file is successfully saved to:\n `' + path + '`',
        buttons: ['OK'],
      });
    } else {
      alert = createAlert({
        text: `The file could not be saved.`,
        buttons: ['OK'],
      });
    }

    alert.runModal();
  }
}

var mapSelection = createSelectionMap(getText);
var createStringFromArray = compose(
  NSString.stringWithString,
  join('\n'),
  removeDuplicates,
);

function onRun(context) {
  var sketch = context.api();
  var document = context.document;
  var originalPage = document.currentPage();
  var selectedLayers = sketch.selectedDocument.selectedLayers;

  if (!hasTextLayer(selectedLayers)) {
    createAlert({
      text: `No text layers selected. Please select at least one text layer.`,
      buttons: ['OK'],
    }).runModal();

    return;
  }

  var stringsArr = mapSelection(selectedLayers).filter(isTruthy);

  saveToFile({
    filenamePrefix: slugify(originalPage.nodeName()),
    content: createStringFromArray(stringsArr)
  });
};
