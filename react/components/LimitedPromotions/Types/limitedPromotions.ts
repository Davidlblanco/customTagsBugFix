export interface ConfigLimitedPromotions {
    promotionId: string
    wasUsed?: {
        available?: number
    }
    configs: {
        text: {
            active: boolean
            phrase: string
            position: 'left' | 'right'
            styles: {
                fontSize: string
                borderColor: string
                borderRadius: string
                backgroundColor: string
                color: string
            }
        }
    }
}