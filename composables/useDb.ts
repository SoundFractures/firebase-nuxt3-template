// composables/useFirestore.ts
import { useCollection } from 'vuefire'
import { collection, getFirestore } from 'firebase/firestore'
import { useNuxtApp } from '#app'

const useDB = () => {
  const { $firebaseApp } = useNuxtApp()

  function getCollection<T>(collectionName: string) {
    return useCollection<T>(
      collection(getFirestore($firebaseApp), collectionName)
    )
  }

  return { getCollection }
}

export default useDB
