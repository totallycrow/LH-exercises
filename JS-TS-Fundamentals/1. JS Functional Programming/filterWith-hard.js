function filterWith(arr, phrase) {

    // - od 0 do 2 znaków w phrase zwracało pusty array,
    // ??
    if(phrase.length <= 2) {
      return false
    }

    const comparisonCheck = (givenPhrase, itemPhrase) => {

      // **************************************
      // Check for any 3 or matching characters
      // **************************************

      // const phraseRegexp = new RegExp(`[${givenPhrase}]`)

      // let filteredChars = [...new Set(String(itemPhrase).split('').filter(char => char.match(phraseRegexp)))]

      // if(filteredChars.length > 2) {
      //   return true
      // } else return false;

      const phraseRegexp = new RegExp(`.*${givenPhrase}.*`)
      const match = String(itemPhrase).match(phraseRegexp);

      console.log(match)

      if(match === null) {
        return false
      } else return true;     
    }

    const searchArray = (item) => {      
      console.log('**********************')
      console.log('START ITERATION')
      console.log('ITEM TYPE:', typeof(item))
      console.log('**********************')  

      // CHECK GIVEN ITEM TYPE
      
      // OBJECT CASE
      if(typeof(item === 'object')) {

        console.log('**********************')
        console.log('START ITERATION - LEVEL OBJECT')
        
        // CHECK ALL PROPERTIES

        for(key in item) {

        console.log('ITEM TYPE:', typeof(item))
        console.log('**********************')    
        console.log(key)

        // CHECK FOR MATCH

        if(comparisonCheck(phrase, item[key])) {
            console.log('------------MATCH-----------')
            console.log(key)
            console.log(item)
            console.log(item[key])
            console.log('ITEM TYPE:', typeof(item))
            return true          
        }
        
        // ELSE CHECK FOR AN ARRAY

        if(Array.isArray(item[key])) {
          console.log('ARRAY FOUND')
          
          // level 2 deep
          results = item[key].filter(element => searchArray(element))

          if(results.length > 0) {            
            return true
          }
        }
      }
      // END OF OBJECT CASE      
      // CHECK VALUES
      if(comparisonCheck(phrase, item)) {
        console.log('match')
        console.log('ITEM: ')
        console.log(item)
        return true
      }
    };
    
    } 
    
  
  result = arr.filter(element => searchArray(element)) 
  return result 
  

}

// ********************* DATA ***************************

const data = [
    {
      _id: "5e985a07feddae7617ac44f6",
      age: 24,
      eyeColor: "brown",
      name: "Cummings Baxter",
      gender: "male",
      company: "VELOS",
      email: "cummingsbaxter@velos.com",
      phone: "+1 (907) 482-2451",
      tags: ["labore", "elit", "excepteur", "nisi", "mollit", "anim", "aliquip"],
      friends: [
        {
          id: 0,
          name: "Sheppard Jensen",
        },
      ],
    },
    {
      _id: "5e985a0709dfa1e6fd93c6ad",
      age: 32,
      eyeColor: "brown",
      name: "Madelyn Dickson",
      gender: "female",
      company: "KENGEN",
      email: "madelyndickson@kengen.com",
      phone: "+1 (984) 521-2439",
      tags: ["nisi", "veniam", "dolore", "officia", "ex", "non", "pariatur"],
      friends: [
        {
          id: 0,
          name: "Bruce Barton",
        },
        {
          id: 1,
          name: "Juliet Schmidt",
        },
        {
          id: 2,
          name: "Horton Haley",
        },
        {
          id: 3,
          name: "Herminia Witt",
        },
      ],
    },
    {
      _id: "5e985a0737e2306e9aef6ecd",
      age: 26,
      eyeColor: "blue",
      name: "Mcguire Mercado",
      gender: "male",
      company: "LINGOAGE",
      email: "mcguiremercado@lingoage.com",
      phone: "+1 (963) 450-2194",
      tags: ["cupidatat", "occaecat", "amet", "qui", "elit", "esse", "deserunt"],
      friends: [
        {
          id: 0,
          name: "Loraine Harper",
        },
        {
          id: 1,
          name: "Luann Randall",
        },
        {
          id: 2,
          name: "Obrien Rich",
        },
        {
          id: 3,
          name: "Noble Wilkerson",
        },
      ],
    },
    {
      _id: "5e985a07148cfba58c860ec2",
      age: 26,
      eyeColor: "brown",
      name: "Marina Porter",
      gender: "female",
      company: "GORGANIC",
      email: "marinaporter@gorganic.com",
      phone: "+1 (867) 417-3497",
      tags: ["laborum", "aliquip", "sit", "adipisicing", "aute", "cupidatat", "aliquip"],
      friends: [
        {
          id: 0,
          name: "Blair Hill",
        },
        {
          id: 1,
          name: "Ebony Jimenez",
        },
      ],
    },
    {
      _id: "5e985a074984f9f08ccaaa4c",
      age: 25,
      eyeColor: "green",
      name: "Barlow Ferguson",
      gender: "male",
      company: "TOYLETRY",
      email: "barlowferguson@toyletry.com",
      phone: "+1 (837) 484-2231",
      tags: ["est", "dolor", "minim", "ut", "anim", "culpa", "non"],
      friends: [
        {
          id: 0,
          name: "Delacruz Acevedo",
        },
        {
          id: 1,
          name: "Gloria Tanner",
        },
        {
          id: 2,
          name: "Cantrell Myers",
        },
        {
          id: 3,
          name: "Fisher Leonard",
        },
      ],
    },
  ];

  // ******************* TEST **************************
  
  console.log('****************')
  console.log('****************')
  console.log('****************')
  console.log('*****************************************************************************')
  console.log(filterWith(data, "nisi"))

  // console.log('****************')
  // console.log('****************')
  // console.log('****************')
  // console.log('*****************************************************************************')

  // console.log(filterWith(data, "Delacruz Acevedo"))

  // console.log('****************')
  // console.log('****************')
  // console.log('****************')
  // console.log('*****************************************************************************')
  // console.log(filterWith(data, "Cummings Baxter")) 