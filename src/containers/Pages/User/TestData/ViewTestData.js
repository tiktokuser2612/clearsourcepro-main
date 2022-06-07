import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  initTestData,
  getTestData,
} from 'store/actions/testData';

import {
  Card,
  Button,
  Spin,
} from 'antd';
import notifier from 'utils/notifier';

class ViewTestDataPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
    };
  }

  componentDidMount() {
    // Remove old data from store
    this.props.initTestData();

    // Get data from backend
    this.props.getTestData(this.state.id)
      .catch(err => {
        notifier.error(err.msg || 'Can not get data.');
      });
  }

  render() {
    const { testData, isFetching } = this.props;

    return (
      <div>
        <h1>
          <Button onClick={this.props.history.goBack} shape="circle">
            <i className="fas fa-arrow-left" />
          </Button> View Data #{testData.id}
        </h1>

        <Spin spinning={isFetching}>
          <Card>
            <Button type="primary" onClick={() => {this.props.history.push('/test-data/' + testData.id + '/edit');}}>
              Edit
            </Button>

            <div>
              <h3>{testData.stringValue}</h3>
              <h3>{testData.numberValue}</h3>
              <h3>{testData.booleanValue ? 'True' : 'False'}</h3>
            </div>
          </Card>
        </Spin>
      </div>
    );
  }
}

ViewTestDataPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  testData: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,

  initTestData: PropTypes.func.isRequired,
  getTestData: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  testData: store.rootReducer.testData.data,
  isFetching: store.rootReducer.testData.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initTestData,
  getTestData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewTestDataPage);