import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

export async function getContact() {
  const res = await fetch(`${url}/api/contact-us?populate=deep`, { cache: cache })
  return res.json()
}

export async function getPolices() {
  const res = await fetch(`${url}/api/menus/2?populate=deep`, { cache: cache })
  return res.json()
}

export async function getPolicyMenu() {
  const res = await getPolices();
  const data = res.data.attributes.items.data;
  return data
}

export async function getContactDetails() {
  const res = await getContact();
  const data = res.data.attributes;
  return data
}