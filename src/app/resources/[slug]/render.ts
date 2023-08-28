import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE

export default async function getResource(slug: any) {
    const fetchPaths = await fetch(`${url}/api/resources/?fields[0]=slug`, { cache: cache })
    const paths = await fetchPaths.json();
    const resourceID: any = []
    paths.data.map((pathData: any) => {
        if (pathData.attributes.slug !== slug) {
            return
        } else {
            resourceID.push(pathData.id)
            return
        }
    })
    if (!resourceID[0]) {
        return {
            error: {
                status: 404,
                message: 'Not Found'
            }
        }
    }
    const ID = resourceID[0]
    const fetchData = await fetch(`${url}/api/resources/${ID}?populate=deep`, { cache: cache })
    const data = await fetchData.json();
    return {
        data: data.data
    }
}