import { GetServerSideProps } from "next";
import { getAccessTokenFromCode } from "../services/googleAuth";

export interface CallbackProps {
  authToken: string;
}
export const getServerSideProps: GetServerSideProps<CallbackProps> = async (
  context
) => {
  const authToken = await getAccessTokenFromCode(context.query.code as string);
  return {
    props: {
      authToken,
    },
  };
};

export default function Callback(props: CallbackProps) {
  if (typeof window !== "undefined") {
    localStorage.setItem("googleAuth", props.authToken);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <p>ayo we got da token</p>
    </main>
  );
}
