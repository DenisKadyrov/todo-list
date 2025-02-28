'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import { BiLoaderAlt } from "react-icons/bi";
import { loginSchema } from "@/lib/defenitions";

 
export default function LoginPage() {
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);

  const onLogin = async (values: any) => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", values);
			const responseData = response.data;
			if (!responseData.error) {
				// No error, redirect to home page
				router.push("/");
				// toast({title: responseData.message});
			}
		} catch (error: any) {
			console.log("anything not ok")
			// Handle network errors or other exceptions
			// const errorMessage =
			// 	error.response?.data?.error || "An error occurred during login.";

			// toast({title: errorMessage});
		} finally {
			setLoading(false);
		}
	};

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    setFieldTouched,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, {resetForm}) => {
      if (isValid) {
        await onLogin(values);
        resetForm();
      }
    },
  });

  const handleTouched = (field: string) => {
		setFieldTouched(field, true);
	};
 
  return (
    <>
		<div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<p className="mx-auto h-10 w-auto flex justify-center items-center font-black text-blue-500 text-2xl">
					ToDo-list
				</p>
			</div>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit} noValidate>
					<div>
						<label
							htmlFor="login"
							className="block text-sm font-medium leading-6 text-black"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="login"
								name="login"
								type="text"
								value={values.login}
								onChange={handleChange}
								onBlur={() => handleTouched("login")}
								placeholder="login"
								required
								className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
									touched.login && errors.login
										? " focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
										: ""}  `}
							/>
							{touched.login && (
								<p className="text-red-600 mt-2 text-sm">{errors.login}</p>
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
								onBlur={() => handleTouched("password")}
								placeholder="rahul@1999"
								required
								className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-black shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
									touched.password && errors.password
										? " focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
										: ""
								}  `}
							/>
							{touched.password && (
								<p className="text-red-600 mt-2 text-sm">{errors.password}</p>
							)}
						</div>
					</div>
					<div className="grid grid-cols-1 gap-3">
						<button
							onClick={onLogin}
							type="submit"
							disabled={!isValid || isSubmitting}
							className="cursor-pointer flex items-center gap-2 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{isSubmitting && loading ? (
							<>
								Logging in...
								<BiLoaderAlt className="text-lg animate-spin" />
							</>
							) : (
							"Log in"
							)}
						</button>
					</div>
				</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member? &nbsp;
						<Link
							href="/signup"
							className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
						>
							Sign up now
						</Link>
					</p>
				</div>
			</div>
		</>
  )
}