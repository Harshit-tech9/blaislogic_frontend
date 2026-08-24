const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { fullName, workEmail, company, interest, requirement } = data;

    // Validate input
    if (!fullName || !workEmail || !company || !interest || !requirement) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'Blaiselogic Website <onboarding@resend.dev>', // Resend testing domain
      to: [process.env.NOTIFICATION_EMAIL || 'hello@blaiselogic.com'], // Uses an env var for the destination email
      reply_to: workEmail,
      subject: `New Website Inquiry from ${fullName} at ${company}`,
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${workEmail}</p>
        <p><strong>Company:</strong> ${company}</p>
        <br/>
        <p><strong>Interest:</strong></p>
        <p>${interest}</p>
        <br/>
        <p><strong>Requirement:</strong></p>
        <p>${requirement}</p>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error sending email', error: error.message })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', id: emailData?.id })
    };

  } catch (error) {
    console.error('Server Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
