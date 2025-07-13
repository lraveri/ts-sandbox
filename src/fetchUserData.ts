type AppUser = {
    id: number;
    name: string;
};

async function getUserData(id: number): Promise<AppUser> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id < 0) reject(new Error('Invalid id'));
            resolve({ id: id, name: 'Luca' });
        }, 1000);
    });
}

// (async () => {
//     try {
//         const user = await getUserData(-3);
//         console.log(user);
//     } catch (error: any) {
//         console.log('Error: ' + error.message);
//     }
// })();

// async function getMultipleUsers(ids: number[]) {
//     const promises = [];
//     for (const id of ids) {
//         promises.push(getUserData(id));
//     }
//     return Promise.all(promises);
// }

async function getMultipleUsers(ids: number[]) {
    const promises = ids.map(getUserData);
    return Promise.all(promises);
}

(async () => {
    const result = await getMultipleUsers([1, 2, 3]);
    console.log(result);
})();
