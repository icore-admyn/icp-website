import { NextResponse, NextRequest } from 'next/server'
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL;
const token: any = process.env.FORM_TOKEN;

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    message: string;
}

function validateFormData(data: FormData): string[] {
    const errors: string[] = [];

    if (!data.firstName) {
        errors.push("First name is required");
    }

    if (!data.lastName) {
        errors.push("Last name is required");
    }

    if (!data.email) {
        errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.push("Invalid email format");
    }

    return errors;
}

export async function POST(req: NextRequest) {
    const formData = await req.json();

    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
        return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }
    const data = {
        "data": {
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "email": formData.email,
            "phone": formData.phone,
            "company": formData.company,
            "role": formData.role,
            "message": formData.message
        }
    }

    const res = await fetch(`${url}/api/contact-forms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });

    const responseData = await res.json()

    console.log(responseData)

    return NextResponse.json(responseData);
}
