import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
// import bcryptjs from "bcrypt";


export async function POST(request) {
    try {
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
		// const salt = await bcryptjs.genSalt(10);
		// const hashedPassword = await bcryptjs.hash(reqBody.password, salt);

        await prisma.user.create({
            data: {
                login: reqBody.login,
                password: reqBody.password, 
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
        console.log(error.message)
		// return NextResponse.json({error: error.message}, {status: 500});
	}
}
