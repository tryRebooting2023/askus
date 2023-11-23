import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';

// The ChartJS library requires that the following lines be included in order to render the chart
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const Analytics = () => {
  const [articleLabels, setArticleLabels] = useState([]);
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchGraphData = () => {
      Meteor.call('getGraphData', (error, response) => {
        if (!error) {
          // Set the articleLabels and articleData state variables to the values returned by the getGraphData method
          setArticleLabels(response.articleLabels);
          setArticleData(response.articleData);
        } else {
          // eslint-disable-next-line no-console
          console.error('Error fetching graph data:', error);
        }
      });
    };
    // Call the fetchGraphData function when the component is first rendered
    fetchGraphData();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount
  // The data object is used to configure the chart
  const data = {
    // The labels array contains the labels for each section of the chart
    labels: articleLabels,
    // The datasets array contains the data for each section of the chart
    datasets: [
      {
        // The label property is used to display the label for the dataset
        label: '# of Uses',
        // The data property is used to set the data for the dataset
        data: articleData,
        // The borderWidth property is used to set the width of the border around each section of the chart
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Analytics</h2>
          </Col>
          <Col className="text-center">
            {articleLabels.length > 0 ? (
              <Doughnut data={data} />
            ) : (
              <h3>No data to display</h3>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
