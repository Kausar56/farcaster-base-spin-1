import React from "react";
import OnboardingApp from "./Onboarding";

const Auth = ({ refetch }: { refetch: () => void }) => {
  return <OnboardingApp refetch={refetch} />;
};

export default Auth;
