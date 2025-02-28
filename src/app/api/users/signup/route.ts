import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from 'bcryptjs';


export async function POST(request: NextRequest) {
    try {
        console.log("user creating")
        //getting data form frontend body
		const reqBody = await request.json();

		//check if the user is exists
		const user = await prisma.user.findUnique({
            where: {login: reqBody.login},
        });

		if (user) {
			return NextResponse.json({error: "User already exists"}, {status: 400});
		}

		//hashing password
		const hashedPassword = await bcryptjs.hash(reqBody.password, 10);

        await prisma.user.create({
            data: {
                login: reqBody.login,
                password: hashedPassword, 
                firstName: reqBody.firstname,
                lastName: reqBody.lastname,
                patronymic: reqBody.patronymic,
            },
        });

		return NextResponse.json({
			message: "User created successfully",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
