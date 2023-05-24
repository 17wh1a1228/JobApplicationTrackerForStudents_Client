export interface Application {
    jobId: number;
    position: string;
    company: string;
    date : Date;
    studentId : number;
    status : number;
    studentDto: Student;
    // status: [
    //   { value: 0, viewValue: 'Applied' },
    //   { value: 1, viewValue: 'Interview' },
    //   { value: 2, viewValue: 'Accepted' },
    //   { value: 3, viewValue: 'Rejected' }
    // ];
  }

  export interface Student {
    studentId: string;
    name: string;
    email: string;
    phone: string;
    url: string;
    applications: Application[];
  }