export interface Teacher {
    id: number;
    teacher: boolean;
    name: string;
    surname: string;
    mail: string;
    phone: number;
    subjects: { subject: string; price: number }[];
    about: string;
    img: string;
}
