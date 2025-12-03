export const getRandomCode = () => {
    return Math.random().toString(36).substring(2,10);
};

