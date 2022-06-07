import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getListTestData,
  deleteTestData,
} from 'store/actions/testData';

import {
  Card,
  Table,
  Button,
  Spin,
  Modal,
} from 'antd';

import notifier from 'utils/notifier';

const confirm = Modal.confirm;

class ListTestData extends React.Component {
  handleCreateButton = () => {
    this.props.history.push('/test-data/create');
  };

  handleTableControl = (pagination, filters, sorter) => {
    this.props.getListTestData(pagination.current, this.props.pagination.pageSize, filters, sorter);
  };

  handleDeleteButton = record => {
    confirm({
      title: 'Warning',
      content: 'Are you sure to delete?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.deleteTestData(record.id)
          .then(res => {
            notifier.success(res.msg);
            this.props.getListTestData(this.props.pagination.current, this.props.pagination.pageSize);
          })
          .catch(err => {
            notifier.error(err.msg);
          });
      },
      onCancel() {},
    });
  };

  componentDidMount() {
    this.props.getListTestData(1, this.props.pagination.pageSize);
  }

  render() {
    const { isFetchingList, items, isDeleting, pagination } = this.props;
    const columns = [
      {
        title: 'StringValue',
        key: 'stringValue',
        dataIndex: 'stringValue',
        sorter: true,
      },
      {
        title: 'NumberValue',
        key: 'numberValue',
        dataIndex: 'numberValue',
        sorter: true,
      },
      {
        title: 'BooleanValue',
        key: 'booleanValue',
        render: (text, record) => <Fragment>{record.booleanValue.toString()}</Fragment>,
        sorter: true,
      },
      {
        title: 'Action',
        key: 'actions',
        render: (text, record) => {
          return (
            <Fragment>
              <Link to={`/test-data/${record.id}`}
                    onClick={() => {this.props.history.push('/test-data/' + record.id);}}>
                <i className="fas fa-eye" />
              </Link>
              <Link to={`/test-data/${record.id}/edit`}
                    onClick={() => {this.props.history.push('/test-data/' + record.id + '/edit');}}>
                <i className="far fa-edit" />
              </Link>
              <a href={`/test-data/${record.id}/delete`}
                 onClick={(e) => {
                   e.preventDefault();
                   this.handleDeleteButton(record);
                 }}>
                <i className="fas fa-trash-alt" />
              </a>
            </Fragment>
          );
        },
      },
    ];

    return (
      <div>
        <h1>List Data</h1>

        <Spin spinning={isDeleting}>
          <Card>
            <Button type="primary" onClick={this.handleCreateButton}>Create</Button>
            <Table
              loading={isFetchingList}
              dataSource={items}
              columns={columns}
              onChange={this.handleTableControl}
              pagination={pagination}
            />
          </Card>
        </Spin>
      </div>
    );
  }
}

ListTestData.propTypes = {
  history: PropTypes.object.isRequired,

  isFetchingList: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,

  getListTestData: PropTypes.func.isRequired,
  deleteTestData: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  isFetchingList: store.rootReducer.testData.isFetchingList,
  items: store.rootReducer.testData.items.map(item => ({ ...item, key: item.id })),
  isDeleting: store.rootReducer.testData.isDeleting,
  pagination: store.rootReducer.testData.pagination,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getListTestData,
  deleteTestData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListTestData);
