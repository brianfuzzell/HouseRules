const _apiUrl = "/api/chore";

export const getChores = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getChoreById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const completeChore = (id, userId) => {
  return fetch(`${_apiUrl}/${id}/complete?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createChore = (chore) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chore),
  }).then((res) => res.json());
};

export const updateChore = (chore) => {
  return fetch(`${_apiUrl}/${chore.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chore),
  });
};

export const deleteChore = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

export const assignChore = (id, userId) => {
  return fetch(`${_apiUrl}/${id}/assign?userId=${userId}`, {
    method: "POST",
  });
};

export const unassignChore = (id, userId) => {
  return fetch(`${_apiUrl}/${id}/unassign?userId=${userId}`, {
    method: "POST",
  });
};
