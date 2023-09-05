import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

export async function getData() {
  const res = await fetch(`${url}/api/cta?populate=*`, { cache: cache })
  return res.json()
}

export default async function getCTA() {
  const res = await getData();
  const data = res.data?.attributes;
  return data
}