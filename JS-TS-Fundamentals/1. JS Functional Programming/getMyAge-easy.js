function getMyAge(input) {
    const currentYear = new Date().getFullYear();
    const yourBirthYear = new Date(String(input)).getFullYear()
    return currentYear - yourBirthYear		
  }
  
  const result1 = getMyAge(new Date(1990, 1, 1));
  const result2 = getMyAge("1990");
  const result3 = getMyAge(1990);
  
  console.log(result1)
  console.log(result2)
  console.log(result3)