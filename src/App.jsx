import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SupplierProvider } from "./contexts/SupplierContext";
import { ModelProvider } from "./contexts/ModelContext";
export default function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <ModelProvider>
            <SupplierProvider>
              <AppRoutes />
            </SupplierProvider>
          </ModelProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

