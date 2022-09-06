/**
 * Uses math function to generate a random string of characters.
 * @returns string random string of characters.
 */
const generateRandomString = () => {
    return Math.random().toString(36).slice(2);
}

export { generateRandomString };