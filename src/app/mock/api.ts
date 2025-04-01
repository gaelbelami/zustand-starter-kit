import { mockDB, simulateDelay, User } from "./db";



type ApiResponse<T> = {
    data: T;
    status: number;
}


export const mockApi = {
    login: async ( credentials: { email: string; password: string}): Promise<ApiResponse<{ user: User; token: string}>> => {
        await simulateDelay();

        const user = mockDB.users.find(u => u.email === credentials.email && u.password === credentials.password) 

        if (!user) {
            return Promise.reject({
                status: 401,
                data: { message: " Invalid credentials" }
            });
        }

        const token = `mock-token-${Date.now()}`;
        mockDB.sessions.push({ token, userId: user.id });

        return  {
            status: 200,
            data: { user, token}
        }
    },

    validateToken: async (token: string): Promise<ApiResponse<User>> => {
        await simulateDelay();

        const session  = mockDB.sessions.find(s => s.token === token);
        if (!session) {
            return Promise.reject({
                status: 401,
                data: { message: "Invalid token"}
            })
        }

        const user = mockDB.users.find(u => u.id === session.userId);
        if (!user) {
            return Promise.reject({
                status: 404,
                data: { message: "User not found" }
            })
        }
        return {
            data: user,
            status: 200,
        }
    }
}