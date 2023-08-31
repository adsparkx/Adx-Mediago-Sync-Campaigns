const mongoose = require("mongoose");
let mongoDB = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			await mongoose
				.connect(process.env.MONGO_URL, {
					minPoolSize: 5,
					maxPoolSize: 10,
					useNewUrlParser: true,
					useUnifiedTopology: false,
				})
				.then(async (result) => {
					console.log("Connected");
				})
				.catch((err) => console.log(err));
			resolve("OK");
		} catch (e) {
			if (e.response) {
				console.log(e.response.data.error);
				console.log(e.response.status);
				console.log(e.response.statusText);
			} else if (e.request) {
				console.log(e.request);
			} else {
				console.log("error ", e.message);
			}
		}
	});
};
let cleanup = async (caller) => {
	console.log(caller);
	mongoose.connection.close();
};
process.on("SIGINT", () => {
	cleanup("SIGINT");
});
process.on("SIGTERM", () => {
	cleanup("SIGTERM");
});
process.on("exit", () => {
	cleanup("exit");
});
module.exports = {
	mongoDB,
};
