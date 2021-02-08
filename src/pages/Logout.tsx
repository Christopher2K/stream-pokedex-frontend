import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router";

import { useAuthentication } from "context/authentication";
import { logout } from "services/authentication";

export const Logout: FC = () => {
  const { setUser } = useAuthentication();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logout().then(() => {
      setUser(undefined);
      setLoading(false);
    });
  });

  return <>{!loading && <Redirect to="/" />}</>;
};
