import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { ReactNode, createContext, useEffect, useState } from "react";
import { firebaseConfig } from "../firebase";
import { Analytics, getAnalytics } from "firebase/analytics";

type FirebaseContextState = {
  app: FirebaseApp | null;
  analytics: Analytics | null;
};

export const FirebaseContext = createContext<FirebaseContextState | undefined>(
  undefined,
);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const _app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    const _analytics = getAnalytics(_app);

    setAnalytics(_analytics);
    setApp(_app);
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        app,
        analytics,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
