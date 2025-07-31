'use client';

import { useState } from "react";

export default function ContactForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    tel: '',
    subject: '',
    message: ''
  })
  const [submittedSucces, setSubmittedSucces] = useState('');
  const [submittedError, setSubmittedError] = useState('');
  const sendForm = e => {
    e.preventDefault();

    emailjs
    .sendForm(
      `${ process.env.EMJS_SERVICE }`,
      `${ process.env.EMJS_TEMPLATE }`,
      e.target,
      `${ process.env.EMJS_USERID }`
    )
    .then(
      result => {
        setSubmittedSucces('Form sent!')
        console.log(result.text)
      },
      error => {
        setSubmittedError(`There's was an error sending the form`)
        console.log(error.text)
      }
    )
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    return setData({
      ...data,
      [name]: value
    })
  }

  return (
    <form onSubmit={ sendForm } className="grid gap-4 max-w-[600px] w-full">
      <input type="text" name="name" placeholder="Name" className="input input-bordered w-full bg-black rounded-sm text-[#f2f2f2] border-[#8B8B8B]" onChange={ e => handleInputChange(e) } onBlur={ e => handleInputChange(e) } value={ data.name.value } />
      <input type="text" name="email" placeholder="Email Address" className="input input-bordered w-full bg-black rounded-sm text-[#f2f2f2] border-[#8B8B8B]" onChange={ e => handleInputChange(e) } onBlur={ e => handleInputChange(e) } value={ data.email.value } />
      <input type="number" name="tel" placeholder="Telephone" className="input input-bordered w-full bg-black rounded-sm text-[#f2f2f2] border-[#8B8B8B]" onChange={ e => handleInputChange(e) } onBlur={ e => handleInputChange(e) } value={ data.tel.value } />
      <input type="text" name="subject" placeholder="Subject" className="input input-bordered w-full bg-black rounded-sm text-[#f2f2f2] border-[#8B8B8B]" onChange={ e => handleInputChange(e) } onBlur={ e => handleInputChange(e) } value={ data.subject.value } />
      <textarea name="message" className="textarea textarea-bordered bg-black rounded-sm text-[#f2f2f2] border-[#8B8B8B]" placeholder="Message" rows="8" onChange={ e => handleInputChange(e) } onBlur={ e => handleInputChange(e) } value={ data.message.value }/>
      <button 
        className="btn bg-[#F2F2F2] text-fg w-full rounded-[4px] uppercase font-[300] hover:bg-black hover:border-white hover:border hover:text-white text-center">
          Send
      </button>
      { submittedSucces ? <p className={`${submittedSucces !== '' ? 'text-[#2d912d] show' : 'hidden' }`}>{ submittedSucces }</p> : null }
      { submittedError ? <p className={`${submittedError !== '' ? 'text-[#c72133] show' : 'hidden' }`}>{ submittedError }</p> : null }
    </form>
  )
}