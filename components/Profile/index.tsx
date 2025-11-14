"use client";

import AppHeader from "../common/AppHeader";
import ProfilePfp from "./ProfilePfp";

export function Profile() {
  return (
    <div className="w-full mb-20">
      <AppHeader headerName="Profile" />
      <ProfilePfp />
    </div>
  );
}
