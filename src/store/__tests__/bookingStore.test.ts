import type {Booking} from '../../api/types';
import {useBookingStore} from '../bookingStore';

const base: Booking = {
  id: 'server-1',
  doctorId: 'dr-ananya',
  slotId: 'dr-ananya__2026-11-27__1030',
  startsAt: '2026-11-27T05:00:00.000Z',
  endsAt: '2026-11-27T05:30:00.000Z',
  status: 'confirmed',
  createdAt: '2026-11-27T04:00:00.000Z',
  doctorName: 'Dr. Ananya Rao',
  specialty: 'General Physician',
  photoUrl: '',
  feeInr: 500,
  clinicName: 'Tapza Clinic, Jubilee Hills',
  serviceName: 'Full body checkup',
};

describe('bookingStore', () => {
  beforeEach(() => {
    useBookingStore.setState({bookings: []});
  });

  it('adds the local booking first and marks it pending', () => {
    const record = useBookingStore
      .getState()
      .addOptimistic({...base, id: 'local-1'});

    expect(record.syncState).toBe('pending');
    expect(useBookingStore.getState().bookings).toHaveLength(1);
    expect(useBookingStore.getState().bookings[0]?.id).toBe('local-1');
  });

  it('reconciles with the server result while keeping local service context', () => {
    const record = useBookingStore
      .getState()
      .addOptimistic({...base, id: 'local-1'});

    useBookingStore.getState().reconcile(record.id, {
      ...base,
      id: 'server-2',
    });

    const bookings = useBookingStore.getState().bookings;
    expect(bookings).toHaveLength(1);
    expect(bookings[0]).toMatchObject({
      id: 'server-2',
      syncState: 'confirmed',
      serviceName: 'Full body checkup',
    });
  });

  it('rolls the optimistic row back when the server fails', () => {
    const record = useBookingStore
      .getState()
      .addOptimistic({...base, id: 'local-1'});

    useBookingStore.getState().rollback(record.id);

    expect(useBookingStore.getState().bookings).toHaveLength(0);
  });

  it('keeps the newest booking first', () => {
    const store = useBookingStore.getState();
    store.addOptimistic({...base, id: 'local-1'});
    store.addOptimistic({...base, id: 'local-2'});
    expect(useBookingStore.getState().bookings[0]?.id).toBe('local-2');
  });

  it('can clear the demo data', () => {
    useBookingStore.getState().addOptimistic(base);
    useBookingStore.getState().clear();
    expect(useBookingStore.getState().bookings).toEqual([]);
  });
});
