function saveData(key, value){

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}



function loadData(key){

  const data =
  localStorage.getItem(key);


  if(data){

    return JSON.parse(data);

  }


  return null;

}
