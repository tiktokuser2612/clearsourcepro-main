import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';

import {
  initTestData,
  getTestData,
  editTestData,
  putTestData,
} from 'store/actions/testData';

import {
  Card,
  Spin,
  Button,
  Form,
  Input,
  Checkbox,
} from 'antd';

import Joi from 'utils/validator';
import notifier from 'utils/notifier';

class EditTestDataPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
    };

    this.schema = {
      stringValue: Joi.string().label('String Value').required(),
      numberValue: Joi.number().label('Number Value').required(),
      booleanValue: Joi.boolean().label('Boolean Value').required(),
    };
  }

  componentDidMount() {
    this.props.initTestData();
    this.props.getTestData(this.props.match.params.id);
  }

  handleChange = (val, key) => {
    // Validate individual
    this.setState({
      errors: {
        ...this.state.errors,
        [key]: Joi.validateToPlainErrors(val, this.schema[key]),
      },
    });

    this.props.editTestData({ [key]: val });
  };

  handleSaveButton = () => {
    // Validate all fields
    const errors = Joi.validateToPlainErrors(this.props.testData, this.schema);
    this.setState({
      errors,
    });

    if (Joi.hasPlainError(errors)) {
      notifier.error('Please fix errors');
      return;
    }

    this.props.putTestData(this.props.match.params.id, this.props.testData)
      .then(res => {
        notifier.success(res.msg);
        this.props.history.push('/test-data/' + res.data.id);
      })
      .catch(err => {
        notifier.error(err.msg);
      });
  };

  render() {
    const { match, testData, edited, isFetching, isPutting } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <Prompt when={edited} message="There are unsaved changes. Are you sure to leave?" />
        <h1>
          <Button onClick={this.props.history.goBack} shape="circle">
            <i className="fas fa-arrow-left" />
          </Button> Edit Data #{match.params.id}
        </h1>

        <Spin spinning={isFetching || isPutting}>
          <Card>
            <Button type="primary" onClick={this.handleSaveButton} disabled={!edited}>
              Save
            </Button>

            <Form.Item
              label="String Value"
              validateStatus={Joi.getFirstPlainError(errors, 'stringValue') ? 'error' : ''}
              help={Joi.getFirstPlainError(errors, 'stringValue')}
            >
              <Input
                value={testData.stringValue}
                onChange={(e) => { this.handleChange(e.target.value, 'stringValue'); }}
              />
            </Form.Item>

            <Form.Item
              label="Number Value"
              validateStatus={Joi.getFirstPlainError(errors, 'numberValue') ? 'error' : ''}
              help={Joi.getFirstPlainError(errors, 'numberValue')}
            >
              <Input
                type="number"
                value={testData.numberValue}
                onChange={(e) => { this.handleChange(e.target.value, 'numberValue'); }}
              />
            </Form.Item>

            <Form.Item
              validateStatus={Joi.getFirstPlainError(errors, 'booleanValue') ? 'error' : ''}
              help={Joi.getFirstPlainError(errors, 'booleanValue')}
            >
              <Checkbox
                checked={testData.booleanValue}
                onChange={(e) => { this.handleChange(e.target.checked, 'booleanValue'); }}
              >
                Boolean Value
              </Checkbox>
            </Form.Item>
          </Card>
        </Spin>
      </div>
    );
  }
}

EditTestDataPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,

  testData: PropTypes.object.isRequired,
  edited: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPutting: PropTypes.bool.isRequired,

  initTestData: PropTypes.func.isRequired,
  getTestData: PropTypes.func.isRequired,
  editTestData: PropTypes.func.isRequired,
  putTestData: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  testData: store.rootReducer.testData.data,
  edited: store.rootReducer.testData.edited,
  isFetching: store.rootReducer.testData.isFetching,
  isPutting: store.rootReducer.testData.isPutting,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initTestData,
  getTestData,
  editTestData,
  putTestData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditTestDataPage);