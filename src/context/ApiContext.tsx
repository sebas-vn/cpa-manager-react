import { createContext, useContext } from "react";
import { apiService } from "../services/ApiService";


const ApiContext = createContext(apiService);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    return <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);