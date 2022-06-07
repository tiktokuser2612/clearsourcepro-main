import React from 'react';
import PropTypes from 'prop-types';

const Pagenation = ({ previousPage, onClick, nextPage, pageLength, currentPage }) => {

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="pagenation_section">
          <span onClick={previousPage}><img src="/images/right_arrow.png" alt="" /></span>
          <nav aria-label="Page navigation" className="mx-3">
            <ul className="pagination justify-content-center m-0">
              {
                [...Array(pageLength)].map((index, i) => (
                  <li className={'page-item ' + (currentPage === (i + 1) ? 'active' : '')} key={i}
                      onClick={() => onClick(i + 1)}>
                    <a className="page-link" href="#">{i + 1}</a>
                  </li>
                ))
              }
            </ul>
          </nav>
          <span onClick={nextPage}><img src="/images/left_arrow.png" alt="" /></span>
        </div>
      </div>
    </div>
  );
};

Pagenation.propTypes = {
  previousPage: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  currentPage: PropTypes.any.isRequired,
  pageLength: PropTypes.any.isRequired,
};

export default Pagenation;
