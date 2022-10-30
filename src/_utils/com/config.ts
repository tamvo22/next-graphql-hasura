// Server configuration for baseUrl paths to use for fetch api calls
const isDev = process.env.NODE_ENV !== 'production';
const server = isDev ? 'http://localhost:3000' : process.env.NEXTAUTH_URL;

export default server;
