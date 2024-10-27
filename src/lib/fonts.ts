import { Poppins, Nunito_Sans } from "@next/font/google";

const poppins_init = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ['300', '400'],
});

export const poppins = poppins_init.variable
