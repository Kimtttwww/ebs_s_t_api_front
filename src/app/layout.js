import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body style={{minWidth: '1040px', padding: '10px 20px'}}>
        {children}
      </body>
    </html>
  );
}
