import ContactForm from "@/app/components/contact-form";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: 'Contact Us'
  }
}

export default async function Page({ params }) {
  const { lang } = params;

  return (
    <div className="pt-[80px] pb-8">
      <div className="main__layout grid place-items-center">
        <div className="text-center mt-8 mb-8">
          <h1 className="text-2xl uppercase font-bold lg:text-4xl mb-4">We would love to hear from you.</h1>
          <p className="text-sm text-fg">Have a question about T-REX products, or just need some more information? Email us at trexinfo1@gmail.com, or fill out the contact form to get in touch. We will get back to you right away!</p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}