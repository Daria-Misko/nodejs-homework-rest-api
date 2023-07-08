const nodemailer = require("nodemailer");

const { GMAIL_USER, GMAIL_API_KEY } = process.env;

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: GMAIL_USER,
		pass: GMAIL_API_KEY,
	},
});

const sendEmail = async (data) => {
	const email = { ...data, from: GMAIL_USER };
	await transporter.sendMail(email);

	return true;
};

module.exports = sendEmail;

// const transporter = nodemailer.createTransport(config);
// const emailOptions = {
// 	from: "miskodariafront666@gmail.com",
// 	to: "darina.mail19@gmail.com",
// 	subject: "Nodemailer test",
// 	text: "Привіт. Ми тестуємо надсилання листів!",
// };

// transporter
// 	.sendMail(emailOptions)
// 	.then((info) => console.log(info))
// 	.catch((err) => console.log(err));
