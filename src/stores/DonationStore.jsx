import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useDonationStore = create(
  persist(
    (set) => ({
      // Matching Donates model fields from schema.prisma
      donation: {
        total: 0,
        payment_method: 'CREDIT',
        transaction_id: '',
        is_recurring: false,
        receipt_url: '',
        status: 'PENDING'
      },

      // UI state
      showPaymentDialog: false,
      totalDonationAmount: 0,

      // Actions
      setDonation: (updates) => set((state) => ({
        donation: {
          ...state.donation,
          ...updates
        }
      })),

      setPaymentMethod: (method) => set((state) => ({
        donation: {
          ...state.donation,
          payment_method: method
        }
      })),

      setTotal: (amount) => set((state) => ({
        donation: {
          ...state.donation,
          total: amount
        }
      })),

      setIsRecurring: (isRecurring) => set((state) => ({
        donation: {
          ...state.donation,
          is_recurring: isRecurring
        }
      })),

      setShowPaymentDialog: (show) => set({ showPaymentDialog: show }),
      
      setTotalDonationAmount: (amount) => set({ totalDonationAmount: amount }),

      // Reset state
      reset: () => set({
        donation: {
          total: 0,
          payment_method: 'CREDIT',
          transaction_id: '',
          is_recurring: false,
          receipt_url: '',
          status: 'PENDING'
        },
        showPaymentDialog: false
      })
    }),
    {
      name: 'friendly-paws-donation-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useDonationStore
