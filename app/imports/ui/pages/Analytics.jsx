import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
//  { Articles } from '../../api/articles/Articles';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const [articleLabels, setArticleLabels] = useState([]);
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchGraphData = () => {
      Meteor.call('getGraphData', (error, response) => {
        if (!error) {
          setArticleLabels(response.articleLabels);
          setArticleData(response.articleData);
        } else {
          console.error('Error fetching graph data:', error);
        }
      });
    };

    fetchGraphData();
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const data = {
    labels: articleLabels,
    datasets: [
      {
        label: '# of Uses',
        data: articleData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
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
          <Col>
            {articleLabels.length > 0 ? (
              <Doughnut data={data} />
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
