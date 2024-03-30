import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    // service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "tester11.dev@gmail.com",
      pass: "qxxgjlpbvohetqpr",
    },
});

const sendMail = async (url, mail, token) => {
  const rand = Math.floor((Math.random() * 89999)+10000)
  const text = token ? `${url}${rand}?token=${token}` : `${url}${rand}`;
    const info = await transporter.sendMail({
        from: 'tester11.dev@gmail.com', // sender address
        to: mail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: text, // plain text body
        // html: "<b>Hello world?</b>", // html body
    }, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
    })
    return rand
}

export default sendMail