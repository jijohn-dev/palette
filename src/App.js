import { useState } from 'react'
import { firebase, auth, firestore, addPalette } from './firebase/firebase'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import Login from './components/Login'
import Palettes from './components/Palettes'
import Header from './components/Header'
import AddPalette from './components/AddPalette'

function App() {  
  const [user] = useAuthState(auth)

  return (
    <div className='container'>
      {user ? <Dashboard /> : <Login onClick={signInWithGoogle}/>}
    </div>
  )
}

function Dashboard() {
  const [showAddPalette, setShowAddPalette] = useState(false)

  const paletteRef = firestore.collection('palettes')
  const query = paletteRef.where('uid', '==', auth.currentUser.uid)

  const [palettes] = useCollectionData(query, {idField: 'id'})
  
  // Handle add
  const handleAdd = (palette) => {    
    addPalette(palette)
    setShowAddPalette(false)
  }

	// Delete palette
	const deletePalette = async(id) => {
		console.log(id)
    await paletteRef.doc(id).delete()
	}

  return (
    <div>
      <Header showAdd={showAddPalette} onAdd={() => setShowAddPalette(!showAddPalette)} />
      <SignOut />
      {showAddPalette && <AddPalette onAdd={handleAdd} />}
      <Palettes palettes={palettes} onDelete={deletePalette} />       
    </div>
  )
}

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider)
}

function SignOut() {
  return auth.currentUser && (
    <button className='btn' onClick={() => auth.signOut()}>Sign Out</button>
  )
}


export default App;
