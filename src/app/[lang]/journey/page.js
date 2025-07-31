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
        "EZ Brothers Genetics was working on the diesel crossed and generously presented us with the whole line including the Sour Krunchz (Karma's Sour Diesel x Runtz)",
        "While Phet Manil gifted us with the Stardawg Guava Wookie from Bodhi Seeds",
      ],
    },
    {
      year: "2021",
      events: [
        "Flowers and Temple Ball of the Sour Krunchz exclusively drop at Sukhumweed industries. In the same years, with a guidance from Ras (HSO), we were able to select and manage the male of Ghost Candy (Geist Grow) properly. Two crossed was made from this Ghost Candy male. both stay unnamed until 2023",
      ],
    },
    {
      year: "2022",
      events: [
        `Testing both crosses at "Undisclosed University" with Robert_Motorcycle and PowerPuff from Shovel.`,
        `Sour Krunchz x Ghost Candy tagged as “S” and Stardawg Guava Wookie X Ghost Candy tagged as “M”`
      ],
    },
    {
      year: "2023",
      events: [
        "No longer with the university but pheno-hunting continue, found S#2, S#21 and M#16 as a keeper and family favorite.",
        "“S” was finally named as ROBERT'S MINT to honor Robert_Motorcycle hard work at the undisclosed university and the cultivar mint character, while “M” named as SAMWISE RISE."
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
                <ul className="list-disc ml-6 space-y-1">
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
