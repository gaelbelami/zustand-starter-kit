export type User = {
    id: string;
    email: string;
    password: string; // In real app, we should never store plain passwords
    name?: string;
}


// Our mock database
export const mockDB = {
    users: [
        {
            id: "1",
            email: "test@example.com",
            password: "password123",
            name: "Test User"
        }
    ] as User[],
    sessions: [] as  { token: string; userId: string }[]
}


// Utility to simulate the API call delay
export const simulateDelay = () => new Promise( resolve => setTimeout(resolve, 500))