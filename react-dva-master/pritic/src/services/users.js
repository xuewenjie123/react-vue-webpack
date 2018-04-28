import request from '../utils/request';
export function fetch(){
    return request(`/api/users?_page=${page}&_limit=5`);
}
export function remove(id){
    return request(`/api/users/${id}`),{
        method:"DELETE",
    }
}
export function patch(id,values){
    return request(`/api/users?${id}`,{
        method:'PATCH',
        body:JSON.stringify(values)
    });
}
export function create(values){
    return request(`/api/users`,{
        method:'POST',
        body:JSON.stringify(values)
    })
}