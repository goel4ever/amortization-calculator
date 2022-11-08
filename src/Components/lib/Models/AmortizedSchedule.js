import AmortizedPayment from "./AmortizedPayment";

export default class AmortizedSchedule {
  constructor() {
    this.schedule = []
  }
  add(amortizedPayment) {
    if (amortizedPayment instanceof AmortizedPayment) {
      this.schedule.push(amortizedPayment)
    }
  }
}
