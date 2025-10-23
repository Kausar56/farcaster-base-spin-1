import type { SafeAreaInsets } from "@/types";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  insets?: SafeAreaInsets;
}

const background = "#1E90FF";

export const SafeAreaContainer = ({
  children,
  insets,
}: SafeAreaContainerProps) => (
  <main
    className="flex h-screen flex-col items-center justify-center overflow-x-hidden bg-gradient-to-bl from-blue-700 via-blue-300 to-indigo-600"
    // style={{
    //   // marginTop: insets?.top ?? 0,
    //   // marginBottom: insets?.bottom ?? 0,
    //   // marginLeft: insets?.left ?? 0,
    //   // marginRight: insets?.right ?? 0,
    //   background: background,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    // }}
  >
    {children}
  </main>
);
