
import { getSelectList, getProjects, getBuildings, getRooms, addRepair } from '../services/repair';
import constants from '../components/constants';
export default {

  namespace: 'repair',

  state: {
    cityList:constants.regionoptions,
    tabs: [
      {
        name: "报修单1",
        key: 1,
        projects:[],
        buildings:[],
        rooms:[],
        files:[],
      },
    ],
    key: 1,
    activeKey: 1,
    selectList:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/repair') {
          dispatch({
            type: 'getSelectList',
            payload: 'SELECT_DIC_GZ'
          });
        }
      });
    },
  },

  effects: {
    *getSelectList({ payload, list }, { call, put }) {
      const { success, data } = yield call(getSelectList, payload );
      if (success) {
        const loop = data => data.map( d => {
          d.label = d.name;
          d.value = d.id;
          if(d.children && d.children.length>0)d.children = loop(d.children)
          return d
        })
        let dat = data?loop(data):[]
        yield put({
          type: 'upState',
          payload: { selectList: dat }
        });
      }
    },
    *getProjects({ payload, list }, { call, put }) {
      const { success, data } = yield call(getProjects, payload.value );
      if (success) {
        let dat = data?data.map( d => {
          d.label = d.name;
          d.value = d.id;
          return d
        }):[]
        yield put({
          type: 'upTabs',
          payload: { data : { projects: dat },key: payload.key}
        });
      }
    },
    *getBuildings({ payload, list }, { call, put }) {
      const { success, data } = yield call(getBuildings, payload.value );
      if (success) {
        let dat = data?data.map( d => {
          d.label = d.name;
          d.value = d.id;
          return d
        }):[]
        yield put({
          type: 'upTabs',
          payload: { data : { buildings: dat },key: payload.key}
        });
      }
    },
    *getRooms({ payload, list }, { call, put }) {
      const { success, data } = yield call(getRooms, payload.value );
      if (success) {
        let dat = data?data.map( d => {
          d.label = d.name;
          d.value = d.id;
          return d
        }):[]
        yield put({
          type: 'upTabs',
          payload: { data : { rooms: dat },key: payload.key}
        });
      }
    },
    *addRepair({ payload, list }, { call, put }) {
      const { success, data } = yield call(addRepair, payload );
      if (success) {
        console.log(data)
        // yield put({
        //   type: 'upState',
        //   payload: { rooms: dat }
        // });
      }
    },
  },

  reducers: {
    onImageAction(state, action) {
      return { ...state, files:action.payload };
    },
    upState(state, action) {
      return { ...state, ...action.payload };
    },
    upTabs(state, action) {
      let tabs = state.tabs;
      tabs[action.payload.key] = { ...tabs[action.payload.key], ...action.payload.data }
      return { ...state, tabs: tabs };
    },
  },

}
