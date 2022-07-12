function getMyAge(input) {
  // 1. typy
  // jeśli typ date => handleDate
  // jeśli typ string => handleString
  // jeśli typ number => handleNumber

  // 2. logika
  // jeśli podana data jest przyszła

  // 3. wymaganie biznesowym
  // nie można wprowadzić roku przed 1990

  const currentYear = new Date().getFullYear();
  const yourBirthYear = new Date(String(input)).getFullYear()
  return currentYear - yourBirthYear		
}

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Date]';
};
  
  const result1 = getMyAge(new Date(1990, 1, 1));
  const result2 = getMyAge("1990");
  const result3 = getMyAge(1990);
  
  console.log(result1)
  console.log(result2)
  console.log(result3)