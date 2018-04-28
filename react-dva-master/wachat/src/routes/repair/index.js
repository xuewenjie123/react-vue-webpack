import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Button, NavBar, Icon, List, Picker, TextareaItem, ImagePicker, InputItem, WhiteSpace, WingBlank, Tabs } from 'antd-mobile';
import { createForm } from 'rc-form';

function Repair({props, location, dispatch, baseproject, form: {
    getFieldProps,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
  }, repair }) {
    const {
      selectList,tabs,key,activeKey,cityList,
    } = repair;

      function dataLoop(data){
        return data.map( d => {
          return d
        })
      }

      function submitAction(){
        //if(allCheck())return; 校验处理
        let formdata = new FormData();
        let data = getFieldsValue();
        console.log(data)
        let upData = [];
        let index = 0;
        tabs.map( d => {
          let obj = {};
          obj.cityId = data['cityId'+d.key]? data['cityId'+d.key][1]:undefined;
          obj.projectId = data['projectId'+d.key]?data['projectId'+d.key][0]:undefined;
          obj.buildingId = data['buildingId'+d.key]?data['buildingId'+d.key][0]:undefined;
          obj.locationId = data['locationId'+d.key]? data['locationId'+d.key][0]:undefined;
          obj.categoryId = data['subCategoryIds'+d.key]? data['subCategoryIds'+d.key][1]:undefined;
          obj.subCategoryIds = data['subCategoryIds'+d.key]? data['subCategoryIds'+d.key][0]:undefined;
          obj.description = data['description'+d.key]? data['description'+d.key]:undefined;
          obj.type = 1;
          obj.eventLocationType = 1;

          console.log( d)
          obj.fileIndex = [];
          if(d.files && d.files.length > 0){
            d.files.map( c => {
              formdata.append("files", c.file);
              obj.fileIndex.push(index);
              index++;
            })
          }
          upData.push(obj)
        })
        let csCLientVo = {
          repairVos: upData,
          name: data.name,
          sex: data.sex?data.sex[0]:undefined,
          contactNumber: data.contactNumber,
        }
        csCLientVo = JSON.stringify(csCLientVo)
        console.log(csCLientVo)
        formdata.append("clientInfo", csCLientVo);
        dispatch({
          type: 'repair/addRepair',
          payload: formdata,
        })
      }
      function onImageAction(files, type, inde, index,) {
        dispatch({
          type: 'repair/upTabs',
          payload: { data: {files: files}, key: index},
        })
      }

      function cityChange(value,key){
        dispatch({
          type: 'repair/getProjects',
          payload: { value: value[1], key: key},
        })
      }
      function buildingsChange(value,key){
        dispatch({
          type: 'repair/getBuildings',
          payload: { value: value[0], key: key},
        })
      }
      function roomsChange(value,key){
        dispatch({
          type: 'repair/getRooms',
          payload: { value: value[0], key: key},
        })
      }
      function onTabsChange(key){
        dispatch({
          type: 'repair/upState',
          payload: { activeKey: key },
        })
      }
      function addTabs(){
        tabs.push({
          name: "报修单"+(key+1),
          key: key+1,
          projects:[],
          buildings:[],
          rooms:[],
          files:[],
        })
        dispatch({
          type: 'repair/upState',
          payload: { tabs: tabs, key: key+1, activeKey: key+1},
        })
      }
      function deleteTabs(index){
        tabs.splice(index,1);
        let activeKey;
        if(tabs[index]){
          activeKey = tabs[index].key
        }else{
          activeKey = tabs[index-1].key
        }
        dispatch({
          type: 'repair/upState',
          payload: { tabs: tabs, activeKey: activeKey },
        })
      }

      const tabpane = tabs.map( (data, index) => {
        return (
          <Tabs.TabPane tab={data.name} key={data.key}>
              <div>
              <WingBlank size='md'>
                <List>
                  {tabs.length>1?<List.Item extra={tabs.length>1?<Icon onClick={()=>deleteTabs(index)} style={{fontSize: '48px'}} type="cross-circle" />:''} style={{background: "#f5f5f9"}}>清除事项</List.Item>:''}
                  <Picker extra="请选择" data={ cityList } title="选择城市" cols={2} {...getFieldProps('cityId'+data.key,{
                    onChange: (value)=>cityChange(value,index),
                  })} >
                    <List.Item arrow="horizontal">城市</List.Item>
                  </Picker>
                  <Picker extra="请选择" data={ data.projects } title="选择单位/小区" cols={1} {...getFieldProps('projectId'+data.key,{
                    onChange: (value)=>buildingsChange(value,index),
                  })} >
                    <List.Item arrow="horizontal">单位/小区</List.Item>
                  </Picker>
                  <Picker extra="请选择" data={ data.buildings } title="选择楼牌号" cols={1} {...getFieldProps('buildingId'+data.key,{
                    onChange: (value)=>roomsChange(value,index),
                  })} >
                    <List.Item arrow="horizontal">楼牌号</List.Item>
                  </Picker>
                  <Picker extra="请选择" data={ data.rooms } title="选择位置" cols={1} {...getFieldProps('locationId'+data.key)} >
                    <List.Item arrow="horizontal">位置</List.Item>
                  </Picker>
                  <Picker extra="请选择" data={ selectList } title="选择报修类型" cols={2} {...getFieldProps('subCategoryIds'+data.key)} >
                    <List.Item arrow="horizontal">报修类型</List.Item>
                  </Picker>
                  <TextareaItem rows={5} count={100} title="问题描述" placeholder="请填写详细问题描述" {...getFieldProps('description'+data.key)}
                  />
                  <List.Item data-seed="logId" style={{background: "#f5f5f9"}}>问题快照</List.Item>
                  <ImagePicker files={data.files} onChange={(files, type, inde)=>onImageAction(files, type, inde,index)} selectable={data.files.length < 5}
                  />
                </List>
              </WingBlank>
              </div>
          </Tabs.TabPane>
        )
      })

  return (
    <div>
      <NavBar mode="dark" iconName="" >
        报修
      </NavBar>
      <div className="scrollBoxMost">
        <List>
          <List.Item extra={<Icon onClick={addTabs} style={{fontSize: '48px'}} type="plus-circle" />} style={{background: "#f5f5f9"}}>报修事项</List.Item>
        </List>
        <Tabs activeKey={activeKey+''} onChange={(key)=>onTabsChange(key)}>
          {tabpane}
        </Tabs>
          <div>
            <List>
              <List.Item data-seed="logId" style={{background: "#f5f5f9"}}>报修人信息</List.Item>
              <InputItem clear placeholder="请输入报修人称呼"
                {...getFieldProps('name', {
                  rules: [
                    { required: true, message: '请输入报修人称呼' },
                  ],
                })}>
                报修人
              </InputItem>
              <Picker extra="请选择" data={ [{value: '1', label: '男'},{value: '2', label: '女'}] } title="请选择性别" cols={1} {...getFieldProps('sex')} >
                <List.Item arrow="horizontal">性别</List.Item>
              </Picker>
              <InputItem clear placeholder="请输入报修人联系方式"
                {...getFieldProps('contactNumber', {
                  rules: [
                    { required: true, message: '请输入报修人联系方式' },
                  ],
                })}>
                联系方式
              </InputItem>
            </List>
            <WhiteSpace size="xl" />
            <Button type="primary" onClick={submitAction}>提交</Button>
            <WhiteSpace size="xl" />
          </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return { repair: state.repair, props: props };
}

export default connect(mapStateToProps)(createForm()(Repair));
