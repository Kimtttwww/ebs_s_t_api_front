'use client'

import store from "@/entites/redux/store";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body style={{minWidth: '1040px', padding: '10px 20px'}}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
