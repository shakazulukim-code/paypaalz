
const BOT_TOKEN = "7937060457:AAF8boHz2--g7BITNWlljoxzL3rjUOE92Uk";
const CHAT_ID = "2100006818";

export const sendTelegramMessage = async (message: string) => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};
