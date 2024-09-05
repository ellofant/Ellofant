import nodemailer from 'nodemailer';

export async function post({ request }) {
  const data = await request.formData();
  const firstName = data.get('firstName');
  const lastName = data.get('lastName');
  const phone = data.get('phone');
  const email = data.get('email');
  const message = data.get('message');

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com", // Replace with your SMTP host
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: "your-email@example.com", // Replace with your email
      pass: "your-password" // Replace with your password
    }
  });

  // Email content
  const mailOptions = {
    from: '"AI Innovate" <your-email@example.com>',
    to: "recipient@example.com", // Replace with the recipient's email
    subject: "New Contact Form Submission",
    text: `
      New contact form submission:
      
      Name: ${firstName} ${lastName}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <h2>New contact form submission:</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Form submitted successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(JSON.stringify({ message: "Error submitting form" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}