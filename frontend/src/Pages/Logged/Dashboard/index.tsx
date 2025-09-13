import React from "react";

import { useAuth } from "contexts/Auth";

const Dashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Dashboard;
