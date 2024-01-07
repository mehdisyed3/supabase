import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'


export const metadata = {
  title:'Promptopia',
  description:'Discover and Share AI Prompts'
}
function RootLayout({children}) {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout