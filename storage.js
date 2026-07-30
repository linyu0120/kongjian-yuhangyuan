// 🏸 空間羽航員 V5.6 Final
// 本機資料保存模組

function saveData(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

function loadData(key) {
  let data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
}
