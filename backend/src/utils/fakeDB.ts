import fs from "fs"
import parser from "csv-parser"


export const readCSVFile = (): Promise<any[]> => {
  const filePath = "../../movies.csv";

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
        Année: parseInt(row['Année(s)']),
        Prix: parseFloat(row.Prix),
        Horaires: row.Horaires.split(',')
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

export let ads = [
    {
      id: 1,
      title: "Bike to sell",
      description:
        "My bike is blue, working fine. I'm selling it because I've got a new one",
      owner: "bike.seller@gmail.com",
      price: 100,
      picture:
        "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
      location: "Paris",
      createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
        "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
        "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
    },
  ];


