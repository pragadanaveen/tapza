import {create} from 'zustand';

import type {Booking, BookingRecord} from '../api/types';

type BookingState = {
  bookings: BookingRecord[];
  addOptimistic: (booking: Booking) => BookingRecord;
  reconcile: (tempId: string, confirmed: Booking) => void;
  rollback: (tempId: string) => void;
  clear: () => void;
};

/**
 * Booking state is deliberately separate from the mock transport.
 *
 * The screen adds a local booking first, then either reconciles it with the
 * server response or rolls it back. That keeps confirmation feeling instant
 * while still letting the mock win in the end.
 */
export const useBookingStore = create<BookingState>(set => ({
  bookings: [],

  addOptimistic: booking => {
    const record: BookingRecord = {...booking, syncState: 'pending'};
    set(state => ({bookings: [record, ...state.bookings]}));
    return record;
  },

  reconcile: (tempId, confirmed) =>
    set(state => ({
      bookings: state.bookings.map(record =>
        record.id === tempId
          ? {
              ...record,
              ...confirmed,
              serviceName: record.serviceName,
              syncState: 'confirmed',
            }
          : record,
      ),
    })),

  rollback: tempId =>
    set(state => ({
      bookings: state.bookings.filter(record => record.id !== tempId),
    })),

  clear: () => set({bookings: []}),
}));
