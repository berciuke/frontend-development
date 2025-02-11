import Navigation from "./components/Navigation";
import { StatsProvider } from "./context/StatsProvider";
import StatsPanel from "./components/StatsPanel";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <StatsProvider>
          <Navigation />
          <div style={{display: "flex", justifyContent: "center"}}>
            <StatsPanel />
            {children}
          </div>
        </StatsProvider>
      </body>
    </html>
  );
}
