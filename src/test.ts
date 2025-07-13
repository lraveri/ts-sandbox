const hello = (): void => {
  console.log('hello');
};

hello();

type User = {
  username: string;
  name?: string;
  surname?: string;
};

const user: User = {
  username: 'lraveri'
};

function log(message: string): void {
  console.log(message);
}

log(user.username);
