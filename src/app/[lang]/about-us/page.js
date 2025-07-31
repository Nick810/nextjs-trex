export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: 'About Us'
  }
}

export default function Page() {
  return (
    <div className="pt-[80px] pb-8">
      <div className="main__layout">
        <div className="min-h-screen flex flex-col justify-center items-center pb-20">
          <h1 className='text-3xl lg:text-6xl mb-4 font-bold text-fg'>Family Owned & Operated Since 2014</h1>
          <p className="text-sm lg:text-lg text-fg">Founded in 2014 with the intention to share a sustainable regenerative organic farming practice, especially for the public and new generation to be aware of the importance of an community-minded environmentally friendly agriculture, which includes the appreciation to the beautiful relationship between natural ecosystems along with the preservation and development of Thailand&apos;s landraces and heirloom genetics.</p>
        </div>
      </div>
    </div>
  )
}