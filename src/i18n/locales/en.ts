/**
 * English is the source of truth for the key set.
 *
 * Every other locale is typed as `Record<TranslationKey, string>`, so a
 * missing or stale translation is a TypeScript error rather than a raw key
 * leaking onto a patient's screen.
 */
export const en = {
  // Tabs (labels also exist in the remote config; these win once a language
  // other than English is chosen so the chrome follows the user).
  'tab.home': 'Home',
  'tab.bookings': 'Bookings',
  'tab.prescriptions': 'Meds',
  'tab.profile': 'Profile',

  // Home
  'home.eyebrow': 'Tapza Clinic · Jubilee Hills',
  'home.greeting': 'Namaste, {name}',
  'home.openTill': 'Open till 7 PM',
  'home.festivalBadge': '{greeting} · festive care is live',
  'home.bannerUpdating': 'Updating the theme from the clinic config…',
  'home.bannerStale': 'Showing your saved theme',
  'home.bannerFallback': 'Using the bundled theme',
  'home.bannerError': 'The new theme did not load',
  'home.bannerKeepUsing':
    'You can keep using the app while we reconnect.',
  'home.bannerErrorBody': '{error} Your current theme is still active.',
  'home.reloadConfig': 'Reload config',
  'home.emptyTitle': 'Nothing planned today',
  'home.emptyMessage':
    'The clinic has not published any home sections yet. You can still book a visit.',
  'home.footerLine': 'Care, close to home · Jubilee Hills, Hyderabad',
  'home.configVersion': 'Config v{version}',
  'home.editionEveryday': 'Everyday care',
  'home.editionFestival': '{name} edition',
  'home.compactEveryday': 'Jubilee Hills, Hyderabad',
  'home.compactFestival': '{name} · Jubilee Hills',
  'home.seeAll': 'See all',
  'home.emptyChips': 'New care options are coming soon.',
  'home.emptyActions': 'Shortcuts will appear here.',
  'home.emptyDoctors': 'No doctors are listed right now.',
  'home.emptyServices': 'Clinic services will appear here.',

  // Bookings tab
  'bookings.title': 'Bookings',
  'bookings.intro': 'Your clinic visits and the care you have planned.',
  'bookings.upcomingVisits': 'Upcoming visits',
  'bookings.pastVisits': 'Earlier visits',
  'bookings.saving': '{count} saving',
  'bookings.confirmed': 'Confirmed',
  'bookings.pending': 'Confirming…',
  'bookings.emptyTitle': 'No bookings yet',
  'bookings.emptyMessage':
    'When you book a doctor or a clinic service, the visit will appear here with its date and time.',
  'bookings.emptyAction': 'Find care',
  'bookings.bookAnother': 'Book another visit',
  'bookings.payNote':
    'Pay at the clinic · free rescheduling up to 2 hours before your visit.',
  'bookings.holdNote':
    'Bookings confirmed here are held for you at Tapza Clinic.',

  // Booking flow
  'book.kicker': 'Tapza Care',
  'book.title': 'Book a visit',
  'book.subtitle': 'Pick a date and time that works for you.',
  'book.serviceClinic': 'Clinic service · pay at the clinic',
  'book.chooseDoctor': 'Choose a doctor',
  'book.yourDoctor': 'Your doctor',
  'book.change': 'Change',
  'book.doctorsErrorTitle': 'Doctors could not load',
  'book.doctorsEmptyTitle': 'No doctors available',
  'book.doctorsEmptyMessage':
    'The clinic has not published any doctors right now. Please try again in a moment.',
  'book.refresh': 'Refresh',
  'book.pickDate': 'Pick a date',
  'book.pickTime': 'Pick a time',
  'book.openSlots': '{count} open',
  'book.timesErrorTitle': 'Times could not load',
  'book.noSlotsTitle': 'No slots on this date',
  'book.noSlotsMessage':
    'Try the next day — most doctors have fresh times each morning.',
  'book.nextDay': 'Try the next day',
  'book.slotsHint':
    'Tap a time to review and confirm. Slots are held only after confirmation.',
  'book.slotsTaken': 'All times on this date are taken. Try another date.',
  'book.chooseDoctorFirst': 'Choose a doctor to see available times.',
  'book.footerNote':
    'You will pay at the clinic. Free rescheduling up to 2 hours before your visit.',
  'book.sheetKicker': 'Confirm visit',
  'book.sheetTitle': 'Review your booking',
  'book.sheetSubtitle': 'One last look before we hold the slot.',
  'book.date': 'Date',
  'book.time': 'Time',
  'book.service': 'Service',
  'book.visit': 'Visit',
  'book.visitValue': 'In-clinic · 30 min',
  'book.fee': 'Consultation fee',
  'book.sheetNote':
    'Pay at the clinic. Free cancellation up to 2 hours before your visit.',
  'book.notNow': 'Not now',
  'book.confirm': 'Confirm booking',

  // Booking result
  'overlay.confirmedKicker': 'Booking confirmed',
  'overlay.failedKicker': 'Booking failed',
  'overlay.bookedTitle': "You're booked",
  'overlay.bookedBody': '{doctor} will see you {when}.',
  'overlay.doctor': 'Doctor',
  'overlay.when': 'When',
  'overlay.where': 'Where',
  'overlay.service': 'Service',
  'overlay.consultation': 'Consultation',
  'overlay.feePayClinic': '₹{fee} · pay at clinic',
  'overlay.viewBookings': 'View my bookings',
  'overlay.backHome': 'Back to home',
  'overlay.tryAgain': 'Try again',
  'overlay.chooseAnother': 'Choose another time',
  'overlay.close': 'Close',
  'overlay.whatsapp': 'A confirmation will be sent on WhatsApp.',
  'overlay.nothingCharged':
    'Nothing has been charged and no booking was saved.',

  // Prescriptions list
  'rx.title': 'Prescriptions',
  'rx.intro': 'Your medicines, doses and today’s schedule — all in one place.',
  'rx.refreshError': 'The latest prescriptions could not be refreshed.',
  'rx.errorTitle': 'Prescriptions could not load',
  'rx.errorMessage': 'Please try again in a moment.',
  'rx.emptyTitle': 'No prescriptions yet',
  'rx.emptyMessage':
    'After a visit, the doctor’s prescription will appear here with a morning, afternoon and night schedule.',
  'rx.todayDoses': 'Today’s doses',
  'rx.doseCount': '{taken} of {total}',
  'rx.activeOne': '1 active prescription · {percent}% done',
  'rx.activeMany': '{count} active prescriptions · {percent}% done',
  'rx.allDone': 'All done',
  'rx.keepGoing': 'Keep going',
  'rx.hintAllDone': 'Every dose is ticked for today. Well done.',
  'rx.hintOpen': 'Open a prescription to tick off a dose.',
  'rx.issued': 'Issued {date}',
  'rx.active': 'Active',
  'rx.completed': 'Completed',
  'rx.moreMeds': '+ {count} more medicines',
  'rx.doseToday': '{completed}/{total} today',
  'rx.courseDone': 'Course done',
  'rx.resetNote':
    'Doses reset every day. Pull down to refresh your prescriptions.',

  // Prescription detail
  'rx.detailKicker': 'Prescription',
  'rx.detailFallbackTitle': 'Your prescription',
  'rx.detailLoading': 'Loading the doctor’s notes…',
  'rx.prescribedBy': 'Prescribed by',
  'rx.clinic': 'Clinic',
  'rx.issuedOn': 'Issued on',
  'rx.courseDay': 'Course day',
  'rx.day': 'Day {day}',
  'rx.medicines': 'Medicines',
  'rx.dosesTakenToday': '{taken} of {total} doses taken today',
  'rx.dayOf': 'Day {day} of {days}',
  'rx.markTaken': 'Mark taken',
  'rx.taken': 'Taken',
  'rx.routineTitle': 'A small routine that helps',
  'rx.routineBody1':
    'Tick each dose as you take it. Today’s ticks reset at midnight, while the prescription stays in your history.',
  'rx.routineBody2':
    'If you miss a dose, skip it rather than doubling up. Call the clinic if you feel unwell.',
  'rx.noneMarked': 'No doses marked yet today.',
  'rx.markedToday': '{count} doses marked today.',
  'rx.markedTodayOne': '1 dose marked today.',

  // Medicine timings
  'timing.morning': 'Morning',
  'timing.afternoon': 'Afternoon',
  'timing.night': 'Night',

  // Local reminders
  'remind.title': 'Reminders',
  'remind.hint':
    'A local notification each morning, afternoon and night for this prescription.',
  'remind.on': 'Reminders on',
  'remind.off': 'Reminders off',
  'remind.grant': 'Allow notifications',
  'remind.blocked': 'Notifications are switched off for Tapza Care.',
  'remind.scheduled': '{count} reminders scheduled today.',
  'remind.none': 'No reminders scheduled.',
  'remind.notifTitle': 'Tapza Care · medicine time',
  'remind.notifBody': '{timing} dose: {medicines}',

  // Profile
  'profile.title': 'Profile',
  'profile.intro':
    'Your account, the live theme and the demo controls used in this assignment.',
  'profile.appearance': 'Appearance',
  'profile.theme': 'Theme',
  'profile.language': 'Language',
  'profile.languageHint':
    'Switch the app between English, Hindi and Telugu.',
  'profile.system': 'System',
  'profile.light': 'Light',
  'profile.dark': 'Dark',
  'profile.reduceTransparency': 'Reduce transparency',
  'profile.clinicTheme': 'Clinic theme',
  'profile.remoteConfig': 'Remote config',
  'profile.demoResilience': 'Demo resilience',
  'profile.remindersSection': 'Medicine reminders',
  'profile.remindersOn': '{count} prescriptions with reminders on',
  'profile.remindersOff': 'No prescriptions with reminders yet',
  'profile.turnOffAll': 'Turn off all',
  'profile.networkLatency': 'Network latency',
  'profile.simulateFailure': 'Simulate failure',
  'profile.emptyLists': 'Empty lists',
  'profile.version': 'Version',
  'profile.source': 'Source',
  'profile.lastSaved': 'Last saved',
  'profile.festival': 'Festival',
  'profile.reloadConfig': 'Reload config',
  'profile.resetDemo': 'Reset demo',
  'profile.notRequested': 'Not requested',
  'profile.none': 'None',
  'profile.lightSurface': 'Light surface',
  'profile.darkSurface': 'Dark surface',

  // Shared actions
  'common.retry': 'Retry',
  'common.bookVisit': 'Book a visit',
  'common.reload': 'Reload',
  'common.cancel': 'Cancel',
  'common.reset': 'Reset',
} as const;
