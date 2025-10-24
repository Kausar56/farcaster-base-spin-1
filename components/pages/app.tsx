"use client";

import { Demo } from "@/components/Home";
import { useFrame } from "@/components/farcaster-provider";
import { SafeAreaContainer } from "@/components/safe-area-container";
import Image from "next/image";
import useAuth from "../useAuth";
import Auth from "../Auth";

export default function Home() {
  const { context, isLoading, isSDKLoaded } = useFrame();
  const fid = context?.user?.fid;
  const { authCheck, configData, isConfigLoading } = useAuth();
  const { data, isLoading: authLoading, refetch } = authCheck(fid);

  if (isLoading || authLoading || isConfigLoading) {
    return (
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <div className="flex w-full min-h-screen bg-gradient-to-tr from-blue-700 via-blue-300 to-indigo-600 flex-col items-center justify-center p-4 space-y-8">
          <Image
            src="/splash.png"
            alt="loading image"
            width={150}
            height={150}
            className="animate-pulse"
          />
        </div>
      </SafeAreaContainer>
    );
  }

  if (!isSDKLoaded) {
    return (
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
          <h1 className="text-3xl font-bold text-center">
            No farcaster SDK found, please use this miniapp in the farcaster app
          </h1>
        </div>
      </SafeAreaContainer>
    );
  }

  // console.log(data);

  return (
    <SafeAreaContainer insets={context?.client.safeAreaInsets}>
      {data && data.success ? <Demo /> : <Auth refetch={refetch} />}
      {/* <Demo /> */}
    </SafeAreaContainer>
  );
}
