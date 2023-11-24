import { Articles } from '/imports/api/articles/Articles';
import Papa from 'papaparse';

const addData = (data) => {
  // console.log(`Adding: ${data.fileName} (${data.title})`);
  Articles.collection.insert(data);
};

// Insert CSV data into Articles collection.
// eslint-disable-next-line no-undef
const csvFilePath = Assets.getText('parsing/parsed_data.csv');
// if articles collection is empty, add data from csv file
if (Articles.collection.find().count() === 0) {
  Papa.parse(csvFilePath, {
    header: true,
    complete: function (results) {
      if (results && results.data) {
        console.log('Inserting CSV data into Articles collection.');
        results.data.forEach(data => {
          if (data.title && data.content) {
            // Only add data if title and content are present
            addData(data, Articles);
          } else {
            // console.warn(`Skipping record with filename: ${data.fileName} due to missing title or content`);
          }
        });
      }
    },
    error: function (error) {
      console.error('Error parsing CSV:', error.message);
    },
  });
}
