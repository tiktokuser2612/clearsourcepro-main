import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import pick from 'lodash/pick';

import {
  initTestData,
  postTestData,
  editTestData,
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

class CreateTestDataPage extends React.Component {
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

  handleCreateButton = () => {
    // Validate all fields
    const errors = Joi.validateToPlainErrors(this.props.testData, this.schema);
    this.setState({
      errors,
    });

    if (Joi.hasPlainError(errors)) {
      notifier.error('Please fix errors');
      return;
    }

    this.props.postTestData(pick(this.props.testData, ['stringValue', 'numberValue', 'booleanValue']))
      .then(res => {
        notifier.success(res.msg);
        this.props.history.push('/test-data/' + res.data.id);
      })
      .catch(err => {
        notifier.error(err.msg);
      });
  };

  render() {
    const { testData, isPosting, edited } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <Prompt when={edited} message="There are unsaved changes. Are you sure to leave?" />
        <h1>
          <Button onClick={this.props.history.goBack} shape="circle">
            <i className="fas fa-arrow-left" />
          </Button> Create New Data
        </h1>

        <Spin spinning={isPosting}>
          <Card>
            <Button type="primary" onClick={this.handleCreateButton}>
              Create
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

CreateTestDataPage.propTypes = {
  history: PropTypes.object.isRequired,

  testData: PropTypes.object.isRequired,
  isPosting: PropTypes.bool.isRequired,
  edited: PropTypes.bool.isRequired,

  initTestData: PropTypes.func.isRequired,
  editTestData: PropTypes.func.isRequired,
  postTestData: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  testData: store.rootReducer.testData.data,
  isPosting: store.rootReducer.testData.isPosting,
  edited: store.rootReducer.testData.edited,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initTestData,
  editTestData,
  postTestData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateTestDataPage);