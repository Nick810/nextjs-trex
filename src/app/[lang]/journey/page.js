export async function generateMetadata() {
  return {
    title: `journey of making Robert's Mint & SAMWISE RISE`
  }
}

export default function Page() {
  const timeline = [
    {
      year: "2020",
      events: [
        "EZ Brothers Genetics worked on diesel crosses",
        "Presented entire line including Sour Krunchz (Karma's Sour Diesel x Runtz)",
      ],
    },
    {
      year: "2021",
      events: [
        "Sour Krunchz flowers and Temple Ball dropped exclusively at Sukhumweed Industries",
        "Under Ras (HSO) guidance, selected and managed Ghost Candy male (Geist Grow)",
        "Two crosses were made from Ghost Candy male, unnamed until 2023",
      ],
    },
    {
      year: "2022",
      events: [
        'Tested both crosses at "Undisclosed University" with Robert_Motorcycle and PowerPuff from Shovel',
        'Sour Krunchz x Ghost Candy labeled as "s" and "M"',
      ],
    },
    {
      year: "2023",
      events: [
        "Left the university, continued pheno-hunting",
        "Found s#2 and s#21 as keeper and family favorite",
        'Named “s” as Robert\'s Mint to honor Robert_Motorcycle and mint traits',
        'Named “M” as Samwise Rise',
      ],
    },
  ];
  return (
    <div className="pt-[80px] pb-8">
      <div className="main__layout">
        <h1 className="text-2xl uppercase font-bold lg:text-4xl mb-8">journey of making Robert&apos;s Mint & SAMWISE RISE</h1>
          <ul className="space-y-6 text-fg">
            {timeline.map(({ year, events }) => (
              <li key={year}>
                <h3 className="text-xl font-semibold mb-4">{year}</h3>
                <ul className="ml-6 space-y-1">
                  {events.map((event, idx) => (
                    <li key={idx}>{event}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}