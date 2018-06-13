import styles from './Users.less';
import UsersModal from './UsersModal';
import { Button, Table, Popconfirm, Pagination } from 'antd';
import { connect } from 'dva';
import { pageSize } from '../constants';
// import { routerRedux } from 'dva/router';

// Stateless Functional Component
const Users = ({
    dispatch, 
    list: dataSource,
    loading,
    page: current,
    total
}) => {
    function deleteUser(id) {
        alert(id);
    }

    function pageChangeHandle(page) {
        dispatch({
            type: 'users/fetchUsers',
            payload: {
                page
            }
        });
        // dispatch(routerRedux.push({
        //     pathname: '/users',
        //     query: { page },
        // }));
    }

    function createUser(user) {
        dispatch({
            type: 'users/create',
            payload: {
                user
            }
        });
    }

    function updateUser(id, user){

    }
    const columns = [{
        key: 'name',
        title: '姓名',
        dataIndex: 'name'
    },{
        key: 'email',
        title: '邮件',
        dataIndex: 'email'
    },{
        key: 'company',
        title: '公司',
        dataIndex: 'company',
        render: (text, record) => (
            record.company.name
        )
    },{
        key: 'operation',
        title: '操作',
        render: (text, record) => (

            <span>
                <UsersModal
                    record={record}
                    onSave={updateUser.bind(null, record.id)}
                >
                    <Button type="primary">修改</Button>
                </UsersModal>
                <Popconfirm
                    title="删除该用户？"
                    okText="删除"
                    cancelText="关闭"
                    placement="left"
                    onConfirm={ deleteUser.bind(null, record.id) }
                >
                    <Button style={{marginLeft:5}} type="primary">删除</Button>
                </Popconfirm>
            </span>
        )
    }];
    return (
        <div className={styles.users}>
            <div className={styles.function}>
                <UsersModal 
                    onSave={createUser}
                    record={{}}
                >
                    <Button  type="primary">创建用户</Button>
                </UsersModal>
            </div>
            <div className={styles.list}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    pagination={false}
                    loading={loading}
                />

                <Pagination
                    className="ant-table-pagination"
                    style={{marginTop:20}}
                    total={total}
                    current={current}
                    pageSize={pageSize}
                    onChange={pageChangeHandle}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        list: state.users.list,
        loading: state.loading.models.users,
        page: state.users.page,
        total: state.users.total
    };
}

export default connect(mapStateToProps)(Users);