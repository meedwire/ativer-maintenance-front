import React, { createContext, useCallback, useEffect, useState } from "react";
import { IStructure, IClient, IContract, IUser } from "../CommonTypes";
import { api, socketConnection } from "../services";
import { Toast } from "../utils";

interface IContextApp {
  structure: {
    state: IStructure[] | undefined;
    setState: React.Dispatch<React.SetStateAction<IStructure[]>>;
    getStructure: () => Promise<void>;
  };
  clients: {
    state: IClient[] | undefined;
    setState: React.Dispatch<React.SetStateAction<IClient[]>>;
    getClients: () => Promise<void>;
  };
  contracts: {
    state: IContract[] | undefined;
    setState: React.Dispatch<React.SetStateAction<IContract[]>>;
    getContracts: () => Promise<void>;
  };
  users: {
    state: IUser[] | undefined;
    setState: React.Dispatch<React.SetStateAction<IUser[]>>;
    getUsers: () => Promise<void>;
  };
}

export const ContextApp = createContext<IContextApp>({} as IContextApp);

export const ContextProvider: React.FC = ({ children }) => {
  const [structure, setStructure] = useState<IStructure[] | undefined>();
  const [clients, setClients] = useState<IClient[] | undefined>();
  const [contracts, setContracts] = useState<IContract[] | undefined>();
  const [users, setUsers] = useState<IUser[] | undefined>();
  const [socket] = useState(socketConnection());

  const getClients = useCallback(async () => {
    try {
      const { data } = await api.get("/client/get");

      if (data) setClients(data);
    } catch (error) {
      Toast.show(error.message, 3000, "error");
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await api.get("/users/get");

      if (data) setUsers(data);
    } catch (error) {
      Toast.show(error.message, 3000, "error");
    }
  }, []);

  const getStructure = useCallback(async () => {
    try {
      const { data } = await api.get("/structure/get");

      if (data) setStructure(data);
    } catch (error) {
      Toast.show(error.message, 3000, "error");
    }
  }, []);

  const getContracts = useCallback(async () => {
    try {
      const { data } = await api.get("/contract/get");

      if (data) setContracts(data);
    } catch (error) {
      Toast.show(error.message, 3000, "error");
    }
  }, []);

  useEffect(() => {
    getClients();
    getStructure();
    getContracts();
    getUsers();
  }, []);

  useEffect(() => {
    const event = socket.on('update/maintenance', () => {
      getContracts();
      Toast.show('Manutencão atualizada', 3000, 'success')
    });

    return () => {
      event.off('update/maintenance');
    };
  }, []);

  return (
    <ContextApp.Provider
      value={{
        structure: {
          state: structure,
          setState: setStructure,
          getStructure,
        },
        clients: {
          state: clients,
          setState: setClients,
          getClients,
        },
        contracts: {
          state: contracts,
          setState: setContracts,
          getContracts,
        },
        users:{
          state: users,
          setState: setUsers,
          getUsers
        }
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
