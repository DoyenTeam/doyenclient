import './globals.css'

//used to obtain the session from firebase and next-auth
import {SessionProvider} from "@/app/SessionProvider";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export const metadata = {
  title: 'Doyen',
  description: 'Search for an Expert',
}

export default async function RootLayout({ children }) {

    //this session will return an object when the user signs in
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
        <body>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </body>
    </html>
  )
}
