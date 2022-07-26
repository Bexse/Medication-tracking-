export interface Medication {
  _id?: { type: String };
  medicationName: { type: String };
  note: { type: String };
  dosage: { type: String };
  frequency: { type: String };
  expiryDate:{type: Date};
  refilRequest: { type: Boolean };
  sideEffects: { type: String };
  contraindication: { type: String };
  duration: { type: Number };
}
