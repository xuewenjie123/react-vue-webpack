import React from 'react';
import {Table,Pagination,Popconfirm,Button } from 'antd';
import {routeRedux} from 'dva/router';
import styles from './Users.css';
import { connect } from 'dva';
import {PAGE_SIZE} from '../../constants';
import UserModal from './UserModal'
function Users({location,dispatch,list:dataSource,loading,total,hides,page: current }) {
  function deleteHandler(id){
   dispatch({
      type:'users/remove',
      payload:id
   })
  }
  function createHandler(values){
    dispatch({
      type:'users/create',
      payload:values
    })
  }
  function pageChangeHandler(page){
    dispatch(routerRedux.push({
      pathname:"/users",
      query:{page},
    })
    )
  }
  function editHandler(id,values){
    dispatch({
      type:"user/patch",
      payload:{id,values}
    })
  }
  function tabshow(){
    dispatch({
      type:'users/save',
      payload:{
          hides: !hides,
      }
    })
  }
  const columns = [
    {
      title:"Name",
      dataIndex:'name',
      key:'name',
      render:text=><a href=''>{text}</a>
    },
    {
      title:"website",
      dataIndex:"website",
      key:'website'
    },
    {
      title:"Email",
      dataIndex:"email",
      key:"email"
    },
    {
      title:"Operation",
      key:"operation",
      render:(text,record)=>(
        <span className={styles.operation}>
        <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>)
    }
  ]
  
  return (
    <div className={styles.normal}>
      <ul style={{display:hides?"block":"none"}} className={styles.comuser_ul}>
        <li>11</li>
        <li>22</li>
        <li>33</li>
      </ul>
      <button onClick={tabshow}>显示或隐藏</button>
      <div>
        <div className={styles.create}>
            <UserModal record={{}} onOk={createHandler}>
              <Button type="primary">create User</Button>
            </UserModal>
        </div>  
      <Table 
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={record=>record.id}
      pagination={false}
      />
      <pagination 
      className="ant-table-pagination"
      total={total}
      current={current}
      pageSize={PAGE_SIZE}
      onChange={pageChangeHandler}
      />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  const { list, total,page,hides } = state.users;
  
  return {
    loading:state.loading.models.users,
    list,
    total,
    page,
    hides,
  };
}
export default connect(mapStateToProps)(Users);
