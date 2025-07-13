// Scrivi una funzione getAdultUserNames che:

// filtra solo gli utenti con age >= 18,

// restituisce un array con solo i nomi (name) di questi utenti.

type Uzer = {
  id: number;
  name: string;
  age: number;
};

const users: Uzer[] = [
  { id: 1, name: 'Alice', age: 22 },
  { id: 2, name: 'Bob', age: 17 },
  { id: 3, name: 'Charlie', age: 30 }
];

function getAdultUserNames(users: Uzer[]) {
  return users.filter((user) => user.age > 18).map((user) => user.name);
}

console.log(getAdultUserNames(users));
