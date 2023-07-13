// const baseUrl: string =
//   process.env.REACT_APP_ENV === 'dev'
//     ? 'http://localhost:8080'
//     : 'https://rides.jurajmajerik.com';

const baseUrl: string = '';
export const api: { [key: string]: any } = {};

api.get = async (endpoint: string): Promise<any> => {
  const res = await fetch(`${baseUrl}/api${endpoint}`);
  if (res.json) return (await res.json()) || [];
  return res;
};
