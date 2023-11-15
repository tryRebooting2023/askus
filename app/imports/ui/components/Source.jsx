import React from 'react';
import PropTypes from 'prop-types';

const Source = ({ source }) => (
    <div>
      {source}
    </div>
  );

// Require a document to be passed to this component.
Source.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Source;
