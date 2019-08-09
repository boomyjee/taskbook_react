
const developerName = 'boomyjee';

export const getTasks  = (sortField = '', sortDirection = '', page = 1) => {
  let params = '';
  if(sortField && sortDirection){
    params = `&sort_field=${sortField}&sort_direction=${sortDirection}`
  }
  if(page){
    params += `&page=${page}`
  }
  return fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=${developerName}${params}`)
}

export const createTask = data => {
  const form = new FormData();
  form.append("username", data.userName);
  form.append("email", data.email);
  form.append("text", data.description);
  
  return fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=${developerName}`, {
    method: 'POST',
    body: form,
  });
};

export const Login = (username, password) => {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
    return fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=${developerName}`, {
      method: 'POST',
      body: form,
    });
};

export const editTask = (id, text, status, token) => {
  const form = new FormData();
  form.append("text", text);
  form.append("status", status);
  form.append("token", token);
  return fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=${developerName}`, {
    method: 'POST',
    body: form
  });
};
