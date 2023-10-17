import { useContext } from "react";
import { AdminContext } from "./AdminContext";

const useAdminStore = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdminStore must be used within a AdminProvider");
  }
  return ctx;
};

export default useAdminStore;
