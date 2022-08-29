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
        user: string,
        shiftSlug: string,
        shiftStartTime: Date,
        shiftEndTime: Date,
        shiftDate: Date,
        hourlyRate: number,
        workplace: string,
        shiftDescription: string,
      };
}
