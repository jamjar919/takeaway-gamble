const pickOneFromArray = <T, >(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

export { pickOneFromArray }