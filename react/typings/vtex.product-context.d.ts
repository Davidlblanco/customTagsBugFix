declare module 'vtex.product-context/useProduct' {
    import { ItemMetadata } from '../modules/AssemblyTypings'

    export interface Attachment {
        id: string,
        name: string,
        required: boolean
    }

    export interface SelectedItem {
        itemId: string
        sellers: Array<{
            commertialOffer: {
                AvailableQuantity: number
            }
        }>
        attachments: Attachment[]
    }

    export interface Product {
        itemMetadata: ItemMetadata
    }

    const useProduct: () => ProductContext
    export default useProduct

    export interface ProductContext {
        selectedQuantity: number
        product: Product | null
        selectedItem: SelectedItem | null
        assemblyOptions: any
    }
}

declare module 'vtex.product-context/ProductDispatchContext' {
    type DispatchFunction = (payload: { type: string; args?: unknown }) => void
    export const useProductDispatch: () => DispatchFunction
}
