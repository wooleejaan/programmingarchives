const getHttpForTest = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();

  return data;
};

export default getHttpForTest;
