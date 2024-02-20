import create from 'zustand';


const getToken = () => {
    const savedData = localStorage.getItem("authState");

    if (savedData) {
        const { token } = JSON.parse(savedData);
        return token as string
    }
    return null
}


interface AuthState {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const localStorageKey = 'authState';

const useAuthStore = create<AuthState>((set) => ({
    token: getToken(),
    login: (token: string) => {
        localStorage.setItem(localStorageKey, JSON.stringify({ token }));
        set({token})
    },
    logout: () => {
        localStorage.removeItem(localStorageKey);
        set({token: null})
    }
}));

export default useAuthStore;