import nodemailer from 'nodemailer';

export function sender(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'keauni695@gmail.com',
            pass: 'yE38F*$TS$A6qu'
        }
    });
    return transporter;


}

