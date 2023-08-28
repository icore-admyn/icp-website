import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

export async function getData() {
  const res = await fetch(`${url}/api/contact-us?populate=deep`, { cache: cache })
  return res.json()
}

export default async function getContactDetails() {
  const res = await getData();
  const data = res.data.attributes;
  return data
}