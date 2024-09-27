declare namespace Express {
	export interface Request {
		userAuthenticated: number;
		permissions: Array;
	}
}