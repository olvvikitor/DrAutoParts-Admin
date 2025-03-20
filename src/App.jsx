import { AppRoutes } from "./routes/AppRoutes"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import { SupplierProvider } from "./contexts/SupplierContext"
export default function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <SupplierProvider>
            <AppRoutes />
          </SupplierProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

