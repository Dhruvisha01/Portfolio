// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    console.log("From contact API", req.body);
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST allowed' });
    }

    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dhruvishamondhe01@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD
            // pass: 'ixyqqjxgakhptqks'
        }
    });

    const mailOptions = {
        from: email,
        to: 'dhruvishamondhe01@gmail.com',
        subject: `New message from ${name}: ${subject}`,
        text: `You received a message:\n\nFrom: ${name} <${email}>\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}
