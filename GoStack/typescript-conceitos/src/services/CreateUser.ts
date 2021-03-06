

// export default function createUser(name = '', email: string, password: string) {
//   const user = {
//     name,
//     email,
//     password
//   }

//   return user;
// }

interface TechObject {
  title: string;
  mastery: number;
}

interface CreateUserData {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | TechObject>; //string[];
}

export default function createUser({name = '', email, password, techs}: CreateUserData) {
  const user = {
    name,
    email,
    password,
    techs
  }

  return user;
}