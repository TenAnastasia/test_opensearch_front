// получение всех данных или данных с параметрами для поиска
export const getData = async (field, query) => {
  let response;
  if (field && query)
    response = await fetch(
      "http://localhost:5000/?field=" + field + "&query=" + query,
    );
  else response = await fetch("http://localhost:5000/");
  return await response.json();
};

// получение конкретных данных по id
export const getOneData = async (id) => {
  const response = await fetch("http://localhost:5000/table/?id=" + id);
  return await response.json();
};
