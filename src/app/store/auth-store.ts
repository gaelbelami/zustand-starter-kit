import { create } from "zustand"
import { persist } from "zustand/middleware"
import { mockApi } from "../mock/api";

type User = {
    id: string;
    email: string;
    name: string;
}

type AuthStore = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string| null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    signup: (credentials: { email: string, password: string }) => Promise<void>;
    logout: () => void;
    initializeAuth: () => Promise<void>
}


export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: true,
            error: null,

            login: async (credentials) => {
                try {
                    set({ isLoading: true, error: null });

                    // Replace the API call
                    // const response = await fetch('/api/login', { 
                    //     method: 'POST',
                    //     body: JSON.stringify(credentials)
                    // })
                    

                    // const data = await response.json();

                    // if (!response.ok) throw new Error(data.message);

                    const response  = await mockApi.login(credentials)

                    set({
                        user: response.data.user,
                        token: response.data.token,
                        isAuthenticated: true,
                        isLoading: false
                    })
                } catch (err:any) {
                    set({
                        error: err.data.message,
                        isLoading: false
                    })
                }
            },

            signup: async (credentials) => {
                try {
                    set({ isLoading: true, error: null })
                    
                } catch (error) {
                    
                }
            },
            logout: () => {
                set({
                 user: null,
                 token: null,
                 isAuthenticated: false,
                })
            },

            initializeAuth: async () => {
                // Check existing auth state on app load
                const { token } = get();
                if(token) {
                    try {
                        // validate token with backend
                        const response = await mockApi.validateToken(token)
                        if(response.status === 200 ) {
                            set({ isAuthenticated: true });
                        }
                    } finally {
                        set({ isLoading: false})
                    }
                } else {
                    set( { isLoading: false });
                }
            }
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ token: state.token, user: state.user})
        }
    )
)