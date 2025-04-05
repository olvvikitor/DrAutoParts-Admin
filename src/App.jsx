import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SupplierProvider } from "./contexts/SupplierContext";
import { ModelProvider } from "./contexts/ModelContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { Productprovider } from "./contexts/ProductContext";

export default function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <CategoryProvider>
            <ModelProvider>
              <SupplierProvider>
                <Productprovider>
                  <AppRoutes />
                </Productprovider>
              </SupplierProvider>
            </ModelProvider>
          </CategoryProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

