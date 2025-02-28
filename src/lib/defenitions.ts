import * as yup from "yup";

export const signupSchema = yup.object().shape({
	firstname: yup
		.string()
		.required("Firstname is required")
		.min(3, "Firtname must be at least 3 characters")
		.max(20, "Firstname must not exceed 20 characters")
		.matches(
			/^[a-zA-Z-]+$/,
			"Firstname can only contain letters"
		),
	lastname: yup
		.string()
		.required("Lastname is required")
		.min(3, "Lastname must be at least 3 characters")
		.max(20, "Lastname must not exceed 20 characters")
		.matches(
			/^[a-zA-Z-]+$/,
			"Lastname can only contain letters"
		),
	patronymic: yup
		.string()
		.required("Patronymic is required")
		.min(3, "Patronymic must be at least 3 characters")
		.max(20, "Patronymic must not exceed 20 characters")
		.matches(
			/^[a-zA-Z-]+$/,
			"Patronymic can only contain letters"
		),
	login: yup
    .string()
    .required("Login is required")
    .min(3, "Login must be at least 3 characters")
    .max(20, "Login must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Login can only contain letters, numbers, underscores, and hyphens",
    ),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one digit"
		),
});

export const loginSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one digit"
		),
});