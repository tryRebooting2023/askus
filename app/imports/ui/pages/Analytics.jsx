import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';

// The ChartJS library requires that the following lines be included to render the chart
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
    labels: articleLabels.map((label) => label.label),
    datasets: [
      {
        label: '# of Uses',
        data: articleData,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="py-3" id="analytics-page">
      <Row className="justify-content-center">
        {/* Left column for Doughnut chart */}
        <Col md={7} className="border-right">
          <Col className="text-center">
            <h2>Analytics</h2>
          </Col>
          <Col className="text-center">
            {articleLabels.length > 0 ? (
              <Doughnut data={data} />
            ) : (
              <h3>Currently no user data</h3>
            )}
          </Col>
        </Col>

        {/* Right column for the list of top three sources */}
        <Col md={5} className="align-items-center">
          <Col className="text-center">
            <h2>Top Used Articles</h2>
          </Col>
          {articleLabels.slice(0, 3).map((label, index) => (
            <Card key={index} className="my-2 p-0">
              <Card.Body>
                <Card.Title>{label.label}</Card.Title>
                <Card.Text>
                  {/* Display the number of times the source was used */}
                  Used {label.count} time(s).
                </Card.Text>
                <Card.Text>
                  {/* Render the link */}
                  <a href={label.link} target="_blank" rel="noopener noreferrer">
                    {label.link}
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
