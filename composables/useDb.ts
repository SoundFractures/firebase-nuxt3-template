import { useFirestore, useCollection, useDocument } from 'vuefire'
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'

export function useDb() {
  const db = useFirestore()

  const getCollection = (collectionName: string) => {
    return useCollection(collection(db, collectionName))
  }

  const getDocument = (collectionName: string, documentId: string) => {
    return useDocument(doc(db, collectionName, documentId))
  }

  const getFilteredCollection = (
    collectionName: string,
    filterField: string,
    filterValue: any,
    orderByField?: string,
    limitCount?: number
  ) => {
    let q = query(
      collection(db, collectionName),
      where(filterField, '==', filterValue)
    )

    if (orderByField) {
      q = query(q, orderBy(orderByField))
    }

    if (limitCount) {
      q = query(q, limit(limitCount))
    }

    return useCollection(q)
  }

  return {
    getCollection,
    getDocument,
    getFilteredCollection,
  }
}
