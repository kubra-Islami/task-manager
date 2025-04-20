import { AppRoutes } from './AppRoutes.jsx'


function App() {
    const isLoggedIn = true // Your logic here

    return (
        <div >
            <main >
                <AppRoutes isLoggedIn={isLoggedIn} />
            </main>
        </div>
    )
}

export default App
