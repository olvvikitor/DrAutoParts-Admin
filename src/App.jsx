import { AppRoutes } from "./routes/AppRoutes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SupplierProvider } from "./contexts/SupplierContext";
import { ModelProvider } from "./contexts/ModelContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { Productprovider } from "./contexts/ProductContext";
import { CustomerProvider } from "./contexts/CustomerContext";
export default function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <CustomerProvider>
            <CategoryProvider>
              <ModelProvider>
                <SupplierProvider>
                  <Productprovider>
                    <AppRoutes />
                  </Productprovider>
                </SupplierProvider>
              </ModelProvider>
            </CategoryProvider>
          </CustomerProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

