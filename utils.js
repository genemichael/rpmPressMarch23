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

function generatePdf() {

  var originalSpreadsheet = SpreadsheetApp.getActive();
    var sheets = originalSpreadsheet.getSheets();
    var sheetName = originalSpreadsheet.getActiveSheet().getName();
    var sourceSheet = originalSpreadsheet.getSheetByName(sheetName)
  
      var c = SpreadsheetApp.getActive().getSheetByName('Quote Letter').getRange('C6');
      var number = c.getValue();
      var d = SpreadsheetApp.getActive().getSheetByName('Quote Letter').getRange('G5');
      var customer = d.getValue();
      var pdfName = number+ ", "+customer;
      var folderID = "15czubt3kG5n1IyaGsSYhSCFesjK68gAJ"; 
      var folder = DriveApp.getFolderById(folderID);
    
      
      
      var destSpreadsheet = SpreadsheetApp.open(DriveApp.getFileById(originalSpreadsheet.getId()).makeCopy("tmp_convert_to_pdf", folder))
  
  
    
    var destSheet = destSpreadsheet.getSheets()[0];
  
    // Repace cell values with text (to avoid broken references).
    var sourceRange = sourceSheet.getRange(1,1,sourceSheet.getMaxRows(),sourceSheet.getMaxColumns());
    var sourcevalues = sourceRange.getValues();
    var destRange = destSheet.getRange(1, 1, destSheet.getMaxRows(), destSheet.getMaxColumns());
    destRange.setValues(sourcevalues);
  
  
    // Save to pdf.
    var theBlob = destSpreadsheet.getBlob().getAs('application/pdf').setName(pdfName);
      
    var newFile = folder.createFile(theBlob);
  
    
  
  DriveApp.getFileById(destSpreadsheet.getId()).setTrashed(true);
  
    
  
    SpreadsheetApp.getUi().alert('New PDF file created in the Quote Letters folder')
  
    
  
  }
  
  
          
  function pdfandemail () {
    var originalSpreadsheet = SpreadsheetApp.getActive();
  
  var sourcesheet = originalSpreadsheet.getSheetByName("Quote Letter");
  var sourcerange = sourcesheet.getRange('A1:I32');  
  var sourcevalues = sourcerange.getValues();
  var data = sourcesheet.getDataRange().getValues();
      var c = SpreadsheetApp.getActive().getSheetByName('Quote Letter').getRange('C6');
      var number = c.getValue();
      var d = SpreadsheetApp.getActive().getSheetByName('Quote Letter').getRange('G5');
      var customer = d.getValue();
    var sss = originalSpreadsheet.getSheetByName("Automated Emails");
    
  var newSpreadsheet = SpreadsheetApp.create(number + customer); 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var projectname = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sourcesheet.copyTo(newSpreadsheet);
  var destrange = sheet.getRange('A1:I32');
  destrange.setValues(sourcevalues);
  newSpreadsheet.getSheetByName('Sheet1').activate();
  newSpreadsheet.deleteActiveSheet();
  
  var pdf = DriveApp.getFileById(newSpreadsheet.getId());
  var theBlob = pdf.getBlob().getAs('application/pdf').setName(number +" " + customer+".pdf");
  
  var folderID = "15czubt3kG5n1IyaGsSYhSCFesjK68gAJ"; 
  var folder = DriveApp.getFolderById(folderID);
  var newFile = folder.createFile(theBlob);
    var fileID = newFile.getId();
  
  DriveApp.getFileById(newSpreadsheet.getId()).setTrashed(true);
   var emailaddress = sss.getRange('F3').getValue();  
    var subject = sourcesheet.getRange('G5:G6').getValues();
    var message = ("Your quote is attached."+"\n"+"This is an automated message");
    var attach = DriveApp.getFileById(fileID);
     var blob = attach.getAs(MimeType.PDF);
    MailApp.sendEmail(emailaddress, subject, message, {attachments:[blob]})
    SpreadsheetApp.getUi().alert('Your email has been sent');
  }

  function jobTicket() {
    var originalSpreadsheet = SpreadsheetApp.getActive();
    
    var sourcesheet = originalSpreadsheet.getSheetByName("Job Ticket");
    var sourcerange = sourcesheet.getRange('A1:K175');  
    var sourcevalues = sourcerange.getValues();
    var data = sourcesheet.getDataRange().getValues();
        var c = SpreadsheetApp.getActive().getSheetByName('Job Ticket').getRange('C2');
        var number = c.getValue();
        var d = SpreadsheetApp.getActive().getSheetByName('Quote Letter').getRange('G5');
        var customer = d.getValue();
      
    var newSpreadsheet = SpreadsheetApp.create(number + customer); 
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var projectname = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = sourcesheet.copyTo(newSpreadsheet);
    var destrange = sheet.getRange('A1:K175');
    destrange.setValues(sourcevalues);
    newSpreadsheet.getSheetByName('Sheet1').activate();
    newSpreadsheet.deleteActiveSheet();
    
    var pdf = DriveApp.getFileById(newSpreadsheet.getId());
    var theBlob = pdf.getBlob().getAs('application/pdf').setName(number +" " + customer+".pdf");
    
    var folderID = "REPLACE ME"; 
    var folder = DriveApp.getFolderById(folderID);
    var newFile = folder.createFile(theBlob);
      var ticketID = newFile.getId()
      sourcesheet.getRange('J2').setValue(ticketID)
    
    DriveApp.getFileById(newSpreadsheet.getId()).setTrashed(true);  
    }
    function record() {
      // In this case, target is the database spreadsheet
      var target = SpreadsheetApp.openById('REPLACE ME');
      var funcsourcesheet = target.getSheetByName('Job Schedule');
      // Source is the active estimate/job ticket document
      var source = SpreadsheetApp.getActiveSpreadsheet();
      // Calling out the document ID allows us to use the IMPORTRANGE function to call living cell data from the documents to the database
      var id = source.getId();
      funcsourcesheet.getRange('P2').setValue(id);
      var targetsheet = target.getSheetByName('Records');
      var lr = targetsheet.getLastRow();
      var lc = targetsheet.getLastColumn();
      var line = (lr+1)
      funcsourcesheet.getRange('A3').setValue(line);
      var estimate = funcsourcesheet.getRange("A2")
      estimate.setValue("=IMPORTRANGE("&line&",'Job Schedule!A2')")
      var rangeValues = funcsourcesheet.getRange('M2:02');
      
      // We start with column 13, because this is where the static data starts. 1 is column A, 2 is B, etc
      rangeValues.copyValuesToRange(targetsheet, 13, lc, (lr+1), (lr+1));
      }
      

      function digSchedule() {
        var source = SpreadsheetApp.getActiveSpreadsheet();
        var sourcesheet = source.getSheetByName('Job Schedule');
        
        var target = SpreadsheetApp.getActiveSpreadsheet()
          var rangeValues = sourcesheet.getRange('A2:O2');
          var A1Range = rangeValues.getA1Notation();
          var SData = rangeValues.getValues()
          var vS = target.getSheetByName('Job Ticket')
          var vStartDate = vS.getRange("H11").getValue();
          var vSTI = sourcesheet.getRange("L2").getValue();
          var vEndDate = vS.getRange("H11").getValue(); 
          var dur = sourcesheet.getRange("N2").getValue();
          var vCust = vS.getRange("D3")
          var vDesc = vS.getRange("D4")
          var job = vS.getRange("C2")
          var sales = source.getSheetByName("Automated Emails").getRange("F3").getValue();
          var pm = source.getSheetByName("Automated Emails").getRange("F5").getValue();
          var stat = vS.getRange("I11")
          var po = vS.getRange("C11").getValue()
          var pd = vS.getRange("H11").getValue()
          var dd = vS.getRange("E11").getValue()
          var note = vS.getRange("B8").getValue()
          var ticket = vS.getRange('J2')
         var calendar = CalendarApp.getCalendarById(
         'REPLACE ME');
          var event =  calendar.createEvent(stat.getValue()+" - " +job.getValue()+", "+ vCust.getValue()+", " +vDesc.getValue() ,
          new Date(vStartDate),
         new Date(vEndDate) )
        
         event.setDescription(note + "\n" + " Proof Out: " +po + "\n" + " Print Date: " + pd + "\n" + " Due Date: " + dd + "\n" + " Duration: " + dur) ; 
        Logger.log('Event ID: ' + event.getId());
          event.addGuest(sales)
          var eID = event.getId();
          vS.getRange("M2").setValue(eID);
        
          var jobname = vS.getRange('D4').getValue();
          var account = vS.getRange('D3').getValue();
          var end = vS.getRange('E11').getValue();
            var message = "This job has been scheduled " +'\n\n' +"Job Number: " +job.getValue() + '\n\n' + "Account: " + account + '\n\n' + "Job Description: " + jobname + '\n\n' +"Press Date: " + vStartDate + '\n\n'+"Requested Ship Date: " + end + '\n\n' +"Calendar Event: "+eID 
            var subject = job.getValue()+" "+jobname+" has been scheduled";
            var timezone = "GMT-8"
         var emailaddress = "gene.m.lauria@rrd.com"
         
         MailApp.sendEmail(emailaddress, subject, message, {cc:pm})
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