import nodemailer from 'nodemailer';

const detectMailService = (email: string) => {
    const domain = email.split('@')[1];
  
    if (domain.includes('gmail.com')) {
      return 'gmail';
    } else if (domain.includes('outlook.com') || domain.includes('hotmail.com')) {
      return 'outlook';
    } else if (domain.includes('yahoo.com')) {
      return 'yahoo';
    } 
    
    else {
      throw new Error('unknown email provider');
    }
  };

  const createTransporter = (service: string) => {
    return nodemailer.createTransport({
      service: service,
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASSWORD  
      }
    });
  };

  export const sendVerificationEmail = async (email: string, token: string) => {
    try {
        const baseUrl = process.env.BASE_URL;
      const mailService = detectMailService(email);
  
     
      const transporter = createTransporter(mailService);
  
      const verificationLink = `${baseUrl}/verify/${token}`; 
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'BookStore Programadores Dominicanos by FrankTech| Verificación de correo electrónico',
        html: `<p>Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar cuenta</a>`
      };
  
      
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error enviando correo:', error);
      throw new Error('Error sending verification email');
    }
  };