"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import { useState} from "react";
import { useFormik } from "formik";
import { signupSchema} from "@/lib/defenitions";
// import {useToast} from "@/components/ui/use-toast";


export default function SignupPage() {
	const router = useRouter();
	const [ isLoading, setLoading ] = useState(false);
	// const {toast} = useToast();

	//backend call for sign up
	const onSignup = async (values: any) => {
		try {
			setLoading(true);
			const response = await axios.post(`/api/users/signup`, values);
			const responseData = response.data;

			if (!responseData.error) {
				// toast.success("Signup success", successState);
				router.push("/login");
				// toast({title: responseData.message});
			}
		} catch (error: any) {
			if (error.response.data.error) {
				// If server response contains error message, display it
				// toast({title: error.response.data.error, variant: "destructive"});
			} else {
				// Otherwise, display a generic error message
				// toast({title: "An error occurred during login. Please try again later."});
			}
			resetForm();
		} finally {
		setLoading(false);
		}
	};

	//form submitting and validation handling
	const {
		values,
		handleChange,
		handleSubmit,
		isValid,
		isSubmitting,
		errors,
		touched,
		setFieldTouched,
		resetForm,
	} = useFormik({
		initialValues: {
			login: "",
			password: "",
			firstname: "",
      lastname: "",
      patronymic: "",
      boss: "",
		},
		validationSchema: signupSchema,
		onSubmit: (values) => {
			//1st check on first render and refresh value is not empty
			if (values.firstname && values.lastname && values.patronymic&& values.login && values.password) {
				onSignup(values);
			}
		},
	});

	//manually handling touched state value true or false
	const handleBlur = (field: string) => {
		setFieldTouched(field, true);
	};

	return (
		<>
			<div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<p className="mx-auto h-10 w-auto flex justify-center items-center font-black text-blue-500 text-2xl">
						TodoApp
					</p>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit} noValidate>
						<div>
							<label
								htmlFor="login"
								className="block text-sm font-medium leading-6 text-black"
							>
                Login
							</label>
							<div className="mt-2">
								<input
									id="login"
									name="login"
									type="login"
									value={values.login}
									onChange={handleChange}
									//check the felid value is touched before make the felid touched value true
									onBlur={() => handleBlur("login")}
									placeholder="your login"
									required
									className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										touched.login && errors.login
											? "text-black focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
											: ""
									}  `}
								/>

								{touched.login && errors.login && (
									<p className="text-red-600 mt-2 text-sm">{errors.login}</p>
								)}
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="firstname"
									className="block text-sm font-medium leading-6 text-black"
								>
									First Name
								</label>
							</div>
							<div className="mt-2">
								<input
									id="firstname"
									name="firstname"
									type="text"
									value={values.firstname}
									onChange={handleChange}
									onBlur={() => handleBlur("firstname")}
									placeholder="firstname"
									required
									className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										touched.firstname && errors.firstname
											? "text-black focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
											: ""
									}  `}
								/>
								{touched.firstname && errors.firstname && (
									<p className="text-red-600 mt-2 text-sm">{errors.firstname}</p>
								)}
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="lastname"
									className="block text-sm font-medium leading-6 text-black"
								>
									Last Name
								</label>
							</div>
							<div className="mt-2">
								<input
									id="lastname"
									name="lastname"
									type="text"
									value={values.lastname}
									onChange={handleChange}
									onBlur={() => handleBlur("lastname")}
									placeholder="lastname"
									required
									className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										touched.lastname && errors.lastname
											? "text-black focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
											: ""
									}  `}
								/>
								{touched.lastname && errors.lastname && (
									<p className="text-red-600 mt-2 text-sm">{errors.lastname}</p>
								)}
							</div>
						</div>
            
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="patronymic"
									className="block text-sm font-medium leading-6 text-black"
								>
									Patronymic
								</label>
							</div>
							<div className="mt-2">
								<input
									id="patronymic"
									name="patronymic"
									type="text"
									value={values.patronymic}
									onChange={handleChange}
									onBlur={() => handleBlur("patronymic")}
									placeholder="patronymic"
									required
									className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										touched.patronymic && errors.patronymic
											? "text-black focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
											: ""
									}  `}
								/>
								{touched.patronymic && errors.patronymic && (
									<p className="text-red-600 mt-2 text-sm">{errors.lastname}</p>
								)}
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-black"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={values.password}
									onChange={handleChange}
									placeholder="password"
									onBlur={() => handleBlur("password")}
									autoComplete="current-password"
									required
									className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										touched.password && errors.password
											? "text-black focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
											: ""
									}  `}
								/>
								{touched.password && errors.password && (
									<p className="text-red-600 mt-2 text-sm">{errors.password}</p>
								)}
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="boss"
									className="block text-sm font-medium leading-6 text-black"
								>
									Boss
								</label>
							</div>
							<div className="mt-2">
								<input
									id="boss"
									name="boss"
									type="text"
									value={values.boss}
									onChange={handleChange}
									onBlur={() => handleBlur("boss")}
									placeholder="your boss"
									required
									className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										touched.boss && errors.boss
											? "text-black focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
											: ""
									}  `}
								/>
								{touched.boss && errors.boss && (
									<p className="text-red-600 mt-2 text-sm">{errors.boss}</p>
								)}
							</div>
						</div>

						<div>
							<button
								onClick={onSignup}
								type="submit"
								disabled={
									!isValid || isSubmitting || Boolean(touched.login && errors.login)
								}
								className={`${
									isValid
										? "bg-blue-600 hover:bg-blue-500 slide-in-elliptic-top-fwd"
										: "bg-red-600 cursor-not-allowed hover:bg-red-500 shake-horizontal"
								} 
                
                cursor-pointer flex items-center gap-2 w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm`}
							>
								{isSubmitting ? "Signing Up..." : "Sign Up"}
								{isLoading && <BiLoaderAlt className="text-lg animate-spin" />}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						already a member? &nbsp;
						<Link
							href="/login"
							className="font-semibold leading-6 text-blue-600 hover:text-blue-400"
						>
							log in now
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
