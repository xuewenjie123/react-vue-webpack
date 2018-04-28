import superagent from 'superagent';
import { hashHistory } from 'dva/router';
import { message } from 'antd'

const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {

  constructor(opts) {

    this.opts = opts || {};
    if (!this.opts.baseURI)
      throw new Error('baseURI option is required');

      function handleData(data){//數據錯誤處理
        if(data.success)return true;
        else message.error( data.errorMsg)
      }

    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path + ".jhtml");
        if (params) {
          request.query(params);
        }

        if (this.opts.headers) {
          request.set(this.opts.headers);
        }

        if (data) {
          request.send(data);
        }

      //  request.set('token',localStorage.getItem("token"));
        // request.set('eid',getCookie('eid'))

        // console.log('当前TOKEY：'+request.header.lt)
        // console.log('当前企业：'+request.header.eid)
        request.withCredentials().end(function (err, body){
          if(err){

          }else{
            console.log(body.body)
            handleData(body.body)?resolve(body.body):""
          }
        });
        //request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      })
    );

  }

}

const api = new _Api({
  baseURI: "http://192.168.0.12:8080/kzwy/",
})

export default api;
