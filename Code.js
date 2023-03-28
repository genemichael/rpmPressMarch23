function doGet() {
  const html = HtmlService.createTemplateFromFile('index');
  return html.evaluate();
}

function require(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


const thisSpreadsheetID = '10TcZDDmOAn_0Ao-6HLFMJ64MNHqZUgk8Y9AI6T4wlGM';
const thisss = SpreadsheetApp.openById( thisSpreadsheetID );
const thisEstimateNumber = "D"+thisss.getSheetByName("Part 1").getRange("J3").getValue();
function getTheEstimateNumber(thisEstimateNumber){
return thisEstimateNumber
console.log(thisEstimateNumber)
}

function getFieldValue() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const fieldValue = thisEstimateNumber;
    return fieldValue;
    
}


