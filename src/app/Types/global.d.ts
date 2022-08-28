export {};

declare global {
    type UserData = {
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        shifts: Array<any>
      };

      type UserShift = {
        shiftId: string,
        shiftDate: string,
        shiftStart: string,
        shiftEnd: string,
        hourlyRate: number,
        shiftHours: number,
        shiftTotal: number,
      };

      type UserEmail = {
        email: string
      }
}
