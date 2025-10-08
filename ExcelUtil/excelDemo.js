const ExcelJs = require('exceljs');

async function excelTest() {
  let output = { row: -1, col: -1 };
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile('download.xlsx');
  const worksheet = workbook.getWorksheet('Sheet1');
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === 'Iphone') {
        output.row = rowNumber;
        output.col = colNumber;
        console.log(rowNumber, colNumber, cell.value);
      }
    });
  });
  const cell = worksheet.getCell(output.row, output.col);
  cell.value = 'Iphone';
  await workbook.xlsx.writeFile('download.xlsx');
}
excelTest();
