import { Twilio } from 'twilio';

const twilioASid = process.env.TWILIO_ASID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = new Twilio(twilioASid, twilioAuthToken);

export const tokenMessage = async (token: string, phone: string) => {
  try {
    console.log(token);
    const sentMessage = await twilioClient.messages.create({
      from: twilioPhoneNumber,
      to: phone,
      body: `Your Narrot Market token is : ${token}`
    });

    console.log(sentMessage);
  } catch (error) {
    console.log(error);
  }
};

export default twilioClient;
