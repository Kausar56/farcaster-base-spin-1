"use client";

import { App } from "@/components/Home";
import { useFrame } from "@/components/farcaster-provider";
import { SafeAreaContainer } from "@/components/safe-area-container";
import Image from "next/image";
import useAuth from "../useAuth";
import Auth from "../Auth";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function Home() {
  const { context, isLoading, isSDKLoaded, setAuthData, authData } = useFrame();
  const fid = context?.user?.fid;
  const { authCheck } = useAuth();
  const { data, isLoading: authLoading, refetch } = authCheck(fid);

  useEffect(() => {
    if (data?.success && setAuthData) {
      setAuthData(data.user);
    }

    console.log("auth data:", data);
  }, [data, setAuthData]);

  if (isLoading || authLoading) {
    return (
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <div className="flex w-full min-h-screen bg-primary flex-col items-center justify-center p-4 space-y-8">
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
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen overflow-x-hidden">
        {authData ? <App /> : <Auth refetch={refetch} />}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={15}
          containerClassName=""
          containerStyle={{}}
          toasterId="default"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background:
                "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(19, 19, 173, 1) 0%, rgba(7, 124, 227, 1) 100%)",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </div>
      {/* <Demo /> */}
    </SafeAreaContainer>
  );
}
