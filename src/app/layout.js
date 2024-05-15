import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSV Data Manipulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <script src="http://localhost:8097"></script>
      </head> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
