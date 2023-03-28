/************************************************** 
* Spreadsheet DB
**************************************************/

const spreadsheetID = '10TcZDDmOAn_0Ao-6HLFMJ64MNHqZUgk8Y9AI6T4wlGM';
const pmAndRepSS= SpreadsheetApp.openById('17lCb2pm4rfKF1xk0MhsdzRXP-XdGvVpKl9GAKPaDmOA');
const materialCatalog = SpreadsheetApp.openById('11b9l152jwg8xOR3bpWZmAaXKU9ZhNAEA1N0xWugQNos');
const customersSheet = SpreadsheetApp.openById('14X63ptrepsk-vqLQ_r3kElPok8to9F2lHU_96yopnps');
const ss = SpreadsheetApp.openById( spreadsheetID );
const sheet = ss.getSheets()[0];


/************************************************** 
 *Estimate Numbers
**************************************************/
function newEstimateNumber() {
    let ss = SpreadsheetApp.openById("10TcZDDmOAn_0Ao-6HLFMJ64MNHqZUgk8Y9AI6T4wlGM");
    let startingRange = ss.getSheetByName("Part 1").getRange("J3");
    let startingnumber = startingRange.getValue();
    let newNumber = startingnumber+1;
    startingRange.setValue(newNumber);
    console.log([startingnumber, newNumber])

    return newNumber;
    
    }

const estNumberFinder = () => {
  return (
    "D"+ss.getSheetByName("Part 1").getRange("J3").getValue()
  ) 
}
const getUser = () => {
const user = Session.getActiveUser().getEmail();
return user
}

function thisIsTheEstimateNumber(estNum) {
  const thisIsTheEstimateNumber = estNum;
}


/**************************************************
 * Estimate Contents
**************************************************/

function estTypeAndNumberToSheet(estTypeData) {
  let thisNumber = "D"+ss.getSheetByName("Part 1").getRange("J3").getValue();
  let newEstTypeData = [thisNumber].concat(estTypeData);
  ss.getSheetByName("estTypeAndNumber").getRange(2,1,1,2).setValues([newEstTypeData]);
}

function estDetailsToSheet(rowData) {
  let thisNumber = "D"+ss.getSheetByName("Part 1").getRange("J3").getValue();
  let newRowData = [thisNumber].concat(rowData);
  ss.getSheetByName("estimateDetails").getRange(2,1,1, rowData.length+1).setValues([newRowData])
}

function sendPrepData(prepData) {
  let thisNumber = "D"+ss.getSheetByName("Part 1").getRange("J3").getValue();
  let newPrepData = [thisNumber].concat(prepData);
  ss.getSheetByName("prepDetails").getRange(2,1,1, prepData.length+1).setValues([newPrepData])
}

function getMachines() {
  const sheet = ss.getSheetByName('Drop-down Menus');
  const lastRow = sheet.getLastRow();
  const machines = sheet.getRange(`C2:C${lastRow}`).getValues().flat().filter(Boolean);
  return machines;
}

function getFinishingMachines() {
  const sheet = ss.getSheetByName('Drop-down Menus');
  const lastRow = sheet.getLastRow();
  const finMachines = sheet.getRange(`B2:B${lastRow}`).getValues().flat().filter(Boolean);
  console.log(finMachines)
  return finMachines;
}

function getSubstrates() {
  const sheet = materialCatalog.getSheetByName('Catalog'); 
  const lastRow = sheet.getLastRow();
  const substrates = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  return substrates
}

function getBasisTypes() {
  const sheet = materialCatalog.getSheetByName('Reference'); 
  const lastRow = sheet.getLastRow();
  const basisTypes = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  return basisTypes
}

function getVendors() {
  const sheet = materialCatalog.getSheetByName('VENDORS'); 
  const lastRow = sheet.getLastRow();
  const vendorNames = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  return vendorNames
}

function getCustomers() {
  const sheet = customersSheet.getSheetByName('Customer List'); 
  const lastRow = sheet.getLastRow();
  const companyNames = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  return companyNames

}

function getPMs() {
  const sheet = pmAndRepSS.getSheetByName('PMS');
  const lastRow = sheet.getLastRow();
  const pms = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  console.log(pms)
  return pms;
}

function getSalesReps() {
  const sheet = pmAndRepSS.getSheetByName('Sales Reps');
  const lastRow = sheet.getLastRow();
  const salesReps = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  return salesReps;
}

function getJobs() {
  const sheet = SpreadsheetApp.openById('1Y1q8wv6d9f9m3DlaG6GSgzqTo2Dfj9UbtXmiHpnALn8').getSheetByName('Jobs');
  const lastRow = sheet.getLastRow();
  const jobs = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  return jobs
}

function getEstimates() {
  const sheet = SpreadsheetApp.openById('1Y1q8wv6d9f9m3DlaG6GSgzqTo2Dfj9UbtXmiHpnALn8').getSheetByName('Estimates');
  const lastRow = sheet.getLastRow();
  const estimates = sheet.getRange(`A2:A${lastRow}`).getValues().flat().filter(Boolean);
  console.log(estimates)
  return estimates
}

function getParts() {
  const sheet = ss.getSheetByName('Imported Parts');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  const headers = values.shift();
  const partNameColumnIndex = headers.indexOf('part_name');

  if (partNameColumnIndex === -1) {
    throw new Error('part_name column not found');
  }

  const parts = values.map(row => {
    const part = {};
    row.forEach((value, index) => {
      part[headers[index]] = value;
    });
    return part;
  });

  return parts;
}



function getPartsDetail(partName) {
  console.log(partName);
  const sheet = ss.getSheetByName('Imported Parts');
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();

  const headers = values.shift();
  
  const partDetails = values.map(row => {
    const part = {};
    row.forEach((value, index) => {
      part[headers[index]] = value.toString().trim();
    });
    return part;
  });

  console.log(partDetails);
  const matchingPart = partDetails.find(part => part.part_name === partName);

  console.log(matchingPart);
  return matchingPart;
}


function putCustomer(newCustomer) {
  customersSheet.getSheetByName('Customer List').getRange(1,customersSheet.getLastRow()+1).setValues([newCustomer]);
}

function putSubstrates(formData) {
  const sheet = materialCatalog.getSheetByName('Custom Import'); 
  let thisNumber = "D"+ss.getSheetByName("Part 1").getRange("J3").getValue();
  let newFormData = [thisNumber].concat(formData);
  sheet.getRange(2,1,1,newFormData.length).setValues([newFormData]);
}

function putStandardSubstrate(matData) {
  const sheet = materialCatalog.getSheetByName('Standard Import'); 
  let thisNumber = "D"+ss.getSheetByName("Part 1").getRange("J3").getValue();
  let newMatData = [thisNumber].concat(matData);
  sheet.getRange(2,1,1,newMatData.length).setValues([newMatData]);
}

function putPart(formData, destRow = null) {
  let thisNumber = "D" + ss.getSheetByName("Part 1").getRange("J3").getValue();
  let destinationSheet = ss.getSheetByName('Imported Parts');
  let newFormData = [thisNumber].concat(formData);

  let lastRow = destinationSheet.getLastRow();
  let range = destinationSheet.getRange(2, 1, lastRow - 1, 2);
  let values = range.getValues();
  
  let rowIndex = values.findIndex(row => row[0] == thisNumber && row[1] == formData[0]);

  if (rowIndex != -1) {
    destRow = rowIndex + 2;
  } else if (values.some(row => row[0] == thisNumber)) {
    destRow = lastRow + 1;
  } else {
    range.clearContent();
    destRow = 2;
  }
  
  destinationSheet.getRange(destRow, 1, 1, newFormData.length).setValues([newFormData]);
}

function passSheetProductionRoute(passSheetForPart) {
  const destinationSheet = ss.getSheetByName('importSheetProdRoute')
  let thisNumber = "D" + ss.getSheetByName("Part 1").getRange("J3").getValue();
  passSheetForPart["Estimate Number"] = thisNumber; // Add Estimate Number property to passSheetForPart object
  let newSheetProdRoute = [
    passSheetForPart.runMethod,
    passSheetForPart.name,
    passSheetForPart.id,
    passSheetForPart.partName,
    passSheetForPart["Estimate Number"]
  ];
  
  let lastRow = destinationSheet.getLastRow();
  let range = destinationSheet.getRange(2, 1, lastRow - 1, 5);
  let values = range.getValues();
  
  let rowIndex = values.findIndex(row => row[0] == thisNumber && row[4] == passSheetForPart.partName);

  if (rowIndex != -1) {
    destRow = rowIndex + 2;
  } else if (values.some(row => row[0] == thisNumber)) {
    destRow = lastRow + 1;
  } else {
    range.clearContent();
    destRow = 2;
  }
  
  destinationSheet.getRange(destRow, 1, 1, newSheetProdRoute.length).setValues([newSheetProdRoute]);
  console.log(newSheetProdRoute)
}


function putQuantities(quantities, partName) {
  const destinationSheet = ss.getSheetByName('importedQuantities');
  const thisNumber = "D" + ss.getSheetByName("Part 1").getRange("J3").getValue();

  const newRows = quantities.map((quantity) => {
    return [thisNumber, quantity, partName];
  });

  const lastRow = destinationSheet.getLastRow();
  const range = destinationSheet.getRange(2, 1, lastRow - 1, 3);
  const values = range.getValues();

  const rowIndex = values.findIndex(row => row[0] == thisNumber && row[2] == partName);
  let destRow;
  
  if (rowIndex != -1) {
    destRow = rowIndex + 2;
  } else {
    destRow = lastRow + 1;
  }
  
  destinationSheet.getRange(destRow, 1, newRows.length, newRows[0].length).setValues(newRows);
}


/************************************************** 
* Database Methods
**************************************************/

const getData = () => { 
  const data = sheet.getDataRange().getValues();
  const fields = data.shift();
  return data.flatMap(row =>  row.map( (col,i) => ({ [fields[i]] : col}) ).reduce((old,current) => ( {...old, ...current} ), {}));
};

const getUserByField = (field,value) => {
 return getData().find(e => e[field] == value);
};

const getUserInfo = () => {
  const userEmail = Session.getActiveUser().getEmail();
  return getUserByField('email', userEmail);
}

/************************************************** 
* TESTS
**************************************************/

const __test__getData = () => {
  console.log( getData());
}

const __test__getUserByField = () => {
  console.log( getUserByField('id', 600));
}

const __test__getUserInfo = () => {
  console.log( getUserInfo() );
}

const test_the_range = () =>{
  const destinationSheet = ss.getSheetByName('importSheetProdRoute')
  const testVal = destinationSheet.getRange(1,1).getValue();
  console.log(testVal)
}

/***************************************************/