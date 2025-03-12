export interface SearchProduct {
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: any
  linkText: string
  productReference: string
  productReferenceCode: string
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: ClusterHighlights
  productClusters: ProductClusters
  searchableClusters: SearchableClusters
  categories: string[]
  categoriesIds: string[]
  link: string
  Variacion: string[]
  Modelo: string[]
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string
  items: Item[]
  itemMetadata: ItemMetadata
}

export interface ClusterHighlights {}

export interface ProductClusters {}

export interface SearchableClusters {}

export interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: ReferenceId[]
  measurementUnit: string
  unitMultiplier: number
  modalType: any
  isKit: boolean
  images: Image[]
  attachments: Attachment[]
  sellers: Seller[]
  Videos: any[]
  estimatedDateArrival: any
}

export interface ReferenceId {
  Key: string
  Value: string
}

export interface Image {
  imageId: string
  imageLabel?: string
  imageTag: string
  imageUrl: string
  imageText: string
  imageLastModified: string
}

export interface Attachment {
  id: number
  name: string
  required: boolean
  domainValues: string
}

export interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: DeliverySlaSamplesPerRegion
  Installments: Installment[]
  DiscountHighLight: any[]
  GiftSkuIds: any[]
  Teasers: Teaser[]
  PromotionTeasers: PromotionTeaser[]
  BuyTogether: any[]
  ItemMetadataAttachment: ItemMetadataAttachment[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  FullSellingPrice: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  DeliverySlaSamples: DeliverySlaSample[]
  GetInfoErrorMessage: any
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: PaymentOptions
}

export interface DeliverySlaSamplesPerRegion {
  "0": N0
}

export interface N0 {
  DeliverySlaPerTypes: any[]
  Region: any
}

export interface Installment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

export interface Teaser {
  "<Name>k__BackingField": string
  "<GeneralValues>k__BackingField": GeneralValuesKBackingField
  "<Conditions>k__BackingField": ConditionsKBackingField
  "<Effects>k__BackingField": EffectsKBackingField
}

export interface GeneralValuesKBackingField {}

export interface ConditionsKBackingField {
  "<MinimumQuantity>k__BackingField": number
  "<Parameters>k__BackingField": ParametersKBackingField[]
}

export interface ParametersKBackingField {
  "<Name>k__BackingField": string
  "<Value>k__BackingField": string
}

export interface EffectsKBackingField {
  "<Parameters>k__BackingField": ParametersKBackingField2[]
}

export interface ParametersKBackingField2 {
  "<Name>k__BackingField": string
  "<Value>k__BackingField": string
}

export interface PromotionTeaser {
  Name: string
  GeneralValues: GeneralValues
  Conditions: Conditions
  Effects: Effects
}

export interface GeneralValues {}

export interface Conditions {
  MinimumQuantity: number
  Parameters: Parameter[]
}

export interface Parameter {
  Name: string
  Value: string
}

export interface Effects {
  Parameters: Parameter2[]
}

export interface Parameter2 {
  Name: string
  Value: string
}

export interface ItemMetadataAttachment {
  Name: string
  NameComplete: string
  MainImage: string
  BrandName: string
  CategoryId: number
  ProductId: number
  id: string
  seller: string
  assemblyOptions: AssemblyOption[]
}

export interface AssemblyOption {
  id: string
  name: string
  required: boolean
  inputValues: InputValues
  composition: any
}

export interface InputValues {
  Criterio: Criterio
}

export interface Criterio {
  maximumNumberOfCharacters: number
  domain: any[]
}

export interface DeliverySlaSample {
  DeliverySlaPerTypes: any[]
  Region: any
}

export interface PaymentOptions {
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
}

export interface InstallmentOption {
  paymentSystem: string
  bin: any
  paymentName: string
  paymentGroupName: string
  value: number
  installments: Installment2[]
}

export interface Installment2 {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: SellerMerchantInstallment[]
}

export interface SellerMerchantInstallment {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}

export interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: any
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description?: string
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: any
}

export interface ItemMetadata {
  items: Item2[]
}

export interface Item2 {
  Name: string
  NameComplete: string
  MainImage: string
  BrandName: string
  CategoryId: number
  ProductId: number
  id: string
  seller: string
  assemblyOptions: AssemblyOption2[]
}

export interface AssemblyOption2 {
  id: string
  name: string
  required: boolean
  inputValues: InputValues2
  composition: any
}

export interface InputValues2 {
  Criterio: Criterio2
}

export interface Criterio2 {
  maximumNumberOfCharacters: number
  domain: any[]
}
