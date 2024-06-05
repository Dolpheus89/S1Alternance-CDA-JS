import fs from "fs"
import parser from "csv-parser"

const filePath = "./movies.csv";

export const readCSVFile = (): Promise<any[]> => {

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`${filePath} not found`));
    }

    let results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(parser({
        separator: ";"
      }))
      .on('data', (row) => results.push({
        ID: parseInt(row.ID),
        Titre: row.Titre,
        Année: parseInt(row['Année']),
        Prix: parseFloat(row.Prix),
        Horaires: row.Horaires.split(",")
      }))
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

export const writeOnCSVFile = (data: string): Promise<void> => {
  return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
          if (err) {
              console.log(err);
              return reject(err);
          }
          console.log("File written successfully");
          resolve();
      });
  });
};

export const csvConverter = (array:any[],header:string):string => {
  const data = array.map(movie =>
      `${movie.ID};${movie.Titre};${movie.Année};${movie.Prix};${movie.Horaires.join(',')}`
  ).join('\n');
  const csvData = `${header}\n${data}`;

  return csvData
}