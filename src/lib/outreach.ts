export const sendOutreachEmail = async ({
  to,
  shopName,
  city,
  estimatedRevenue,
}: {
  to: string;
  shopName: string;
  city: string;
  estimatedRevenue: number;
}) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }

  const subject = `Neue Express-Reparaturanfragen in ${city} für ${shopName}`;
  
  // German email template
  const html = `
    <h1>Hallo ${shopName},</h1>
    <p>Wir haben eine hohe Nachfrage nach Fahrradreparaturen in <strong>${city}</strong> festgestellt.</p>
    <p>Basierend auf unseren Daten könnten Sie mit VeloDash monatlich zusätzlich ca. <strong>${estimatedRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</strong> verdienen, indem Sie ungenutzte Express-Termine anbieten.</p>
    <p>VeloDash verbindet Radfahrer, die sofortige Hilfe benötigen, mit Werkstätten wie Ihrer.</p>
    <p>Interessiert? Klicken Sie hier, um Ihren Shop zu beanspruchen:</p>
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/shops/claim" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Shop jetzt beanspruchen</a>
    <p>Mit freundlichen Grüßen,<br>Das VeloDash Team</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'VeloDash <onboarding@velodash.de>', // Use a verified domain in production
      to: [to],
      subject,
      html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Resend API error: ${data.message || response.statusText}`);
  }

  return data;
};
