/* eslint-disable linebreak-style */
/* eslint-disable semi */
const access = (...permittedRoles) => {
	return (req, res, next) => {
		try {
			const role = req.body.role;

			if (permittedRoles.includes(role)) {
				next();
			} else {
				res.status(200).json({ msg: "You are not authorized" });
			}
		} catch (error) {
			res.status(400).json({ error });
		}
	};
};

module.exports = { access };
