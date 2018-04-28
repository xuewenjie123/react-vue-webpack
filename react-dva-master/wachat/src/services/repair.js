import api from '../utils/request';
import Form from '../utils/requestFormData';

export async function getSelectList(params) {
  return api.post('wx/common/getSelectList', {
    data: params
  });
}
export async function getProjects(params) {
  return api.post('wx/repair/getProjects', {
    data:JSON.stringify(params)
  });
}
export async function getBuildings(params) {
  return api.post('wx/repair/getBuildings', {
    data:JSON.stringify(params)
  });
}
export async function getRooms(params) {
  return api.post('wx/repair/getRooms', {
    data:JSON.stringify(params)
  });
}
export async function addRepair(params) {
  return Form.post('wx/repair/addRepair', {
    data: params
  });
}
