import PeriodicTable from "@/components/periodic-table"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <main className="min-h-screen bg-[rgb(31,41,53)] text-white overflow-hidden">
        <div className="container mx-auto py-8">
          <PeriodicTable />
        </div>
      </main>
    </ThemeProvider>
  )
}

